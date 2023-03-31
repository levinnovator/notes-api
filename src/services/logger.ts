import * as winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.splat(),
      ),
    }),
    new winston.transports.File({
      dirname: 'logs',
      filename: `${process.env.NODE_ENV}.log`,
      level: 'debug',
      format: winston.format.simple(),
    }),
  ],
});

export default logger;
