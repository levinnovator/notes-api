import '@initializers';

import cors from 'cors';
import express from 'express';

import { launchConfig, databaseConfig, corsConfig } from '@config';
import { Database, logger } from '@services';
import rootRouter from './router';
import { errorHandler } from '@middlewares';

(async () => {
  await Database.initialize(databaseConfig);

  const app = express();

  app.use(cors(corsConfig));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/', rootRouter);

  app.use(errorHandler);

  app.listen(launchConfig.port, () => {
    logger.info(`Server listening at http://localhost:${launchConfig.port}`);
  });
})();
