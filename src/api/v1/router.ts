import { Router } from 'express';

import notesRouter from '@api/v1/notes/notes.router';
import healthRouter from '@api/v1/health/health.router';

const router = Router();

router.use('/notes', notesRouter);
router.use('/ping', healthRouter);

export default router;
