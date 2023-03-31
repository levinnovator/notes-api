import { ErrorRequestHandler } from 'express';

import { logger } from '@services';
import { respondWith } from '@services/request-handler';
import { BaseError, ValidationError } from '@services/request-handler/errors';

const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  try {
    if (err instanceof ValidationError) {
      return respondWith(res, {
        code: err.code,
        data: { errors: err.errors },
        format: req.query.format?.toString(),
      });
    } else if (err instanceof BaseError) {
      return respondWith(res, {
        code: err.code,
        data: { errors: [err.message] },
        format: req.query.format?.toString(),
      });
    } else {
      throw err;
    }
  } catch (e) {
    const error = e as Error;

    logger.error(error);
    res.sendStatus(500);
  }
};

export default errorHandler;
