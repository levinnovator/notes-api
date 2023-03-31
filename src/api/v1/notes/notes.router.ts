import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';

import { respondWith } from '@services/request-handler';
import NotesController from './notes.controller';
import {
  MissingRecordError,
  ValidationError,
} from '@services/request-handler/errors';

const router = Router();

router.get(
  '/',
  query('limit').optional().isNumeric().toInt(),
  query('page').optional().isNumeric().toInt(),
  async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return next(
        new ValidationError(validationErrors.array({ onlyFirstError: true })),
      );
    }

    const limit = parseInt(req.query?.limit || 20);
    const page = parseInt(req.query?.page || 1);
    const pageIndex = page - 1;
    const skip = pageIndex * limit;

    const notes = await NotesController.list(limit, skip);

    const totalNotesCount = await NotesController.count();

    return respondWith(res, {
      code: 200,
      data: {
        pagination: {
          page,
          itemsPerPage: limit,
          totalItems: totalNotesCount,
          pages: Math.ceil(totalNotesCount / limit),
          startAt: skip,
          endAt: skip + notes.length,
        },
        data: notes,
      },
      format: req.query?.format,
    });
  },
);

router.get(
  '/:noteId',
  param('noteId').isNumeric().toInt(),
  async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return next(
          new ValidationError(validationErrors.array({ onlyFirstError: true })),
        );
      }

      const note = await NotesController.get(req.params?.noteId);

      if (!note) {
        return next(new MissingRecordError());
      }

      return respondWith(res, {
        code: 200,
        data: note,
        format: req.query?.format,
      });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/',
  body('title').isString().notEmpty(),
  body('message').isString().notEmpty(),
  async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return next(
          new ValidationError(validationErrors.array({ onlyFirstError: true })),
        );
      }

      const note = await NotesController.create(req.body);

      return respondWith(res, {
        code: 200,
        data: note,
        format: req.query?.format,
      });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/:noteId',
  param('noteId').isNumeric().toInt(),
  body('title').isString().optional(),
  body('message').isString().optional(),
  async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return next(
          new ValidationError(validationErrors.array({ onlyFirstError: true })),
        );
      }

      const note = await NotesController.update(req.params?.noteId, req.body);

      if (!note) return next(new MissingRecordError());

      return respondWith(res, {
        code: 200,
        data: note,
        format: req.query?.format,
      });
    } catch (e) {
      next(e);
    }
  },
);

router.delete(
  '/:noteId',
  param('noteId').isNumeric().toInt(),
  async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return next(
          new ValidationError(validationErrors.array({ onlyFirstError: true })),
        );
      }

      const result = await NotesController.delete(req.params?.noteId);

      if (!result.affected) {
        return next(new MissingRecordError());
      }

      return respondWith(res, {
        code: 200,
        data: { success: true },
        format: req.query?.format,
      });
    } catch (e) {
      next(e);
    }
  },
);

export default router;
