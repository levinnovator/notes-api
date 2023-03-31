import { Response } from 'express';

import { UnsupportedFormatError } from './errors';
import { ResponseFormat } from './types';

export interface RespondWithOptions {
  code: number;
  data: any;
  format?: string;
}

const respondWith = (
  res: Response,
  { code, data, ...options }: RespondWithOptions,
) => {
  const format = (options.format ?? 'json') as ResponseFormat;

  switch (format) {
    case 'json':
      return res.status(code).json(data);
    case 'jsonp':
      return res.status(code).jsonp(data);
    default:
      throw new UnsupportedFormatError(format);
  }
};

export default respondWith;
