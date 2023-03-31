import { Router } from 'express';

import { apiV1Router } from '@api/v1';
import { withValidResponseFormat } from '@middlewares';

const router = Router();

router.use('/v1', withValidResponseFormat, apiV1Router);

export default router;
