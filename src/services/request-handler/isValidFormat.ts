import { RESPONSE_FORMATS } from './constants';

const isValidFormat = (format: any) => {
  return !format || RESPONSE_FORMATS.includes(format);
};

export default isValidFormat;
