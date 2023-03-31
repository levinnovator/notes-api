import { logger } from '@services';

const errorHandler = (err: Error) => {
  logger.error(err.message, err.stack);

  process.exit(1);
};

process.on('unhandledRejection', errorHandler);
process.on('uncaughtException', errorHandler);
