import { NextFunction, Request, Response } from 'express';
import { isValidFormat } from '@services/request-handler';
import { UnsupportedFormatError } from '@services/request-handler/errors';

const withValidResponseFormat = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const format = req.query.format;
  const isValid = isValidFormat(format);

  if (!isValid) return next(new UnsupportedFormatError(format?.toString()));

  return next();
};

export default withValidResponseFormat;
