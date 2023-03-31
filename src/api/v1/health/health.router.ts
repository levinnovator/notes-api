import { Router } from 'express';

import { respondWith } from '@services/request-handler';
import HealthController from './health.controller';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const isAccessible = HealthController.isAccessible();

    return respondWith(res, {
      code: isAccessible ? 200 : 500,
      data: {
        pong: true,
      },
      format: req.query?.format?.toString(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
