import BaseError from './BaseError';

class UnsupportedFormatError extends BaseError {
  constructor(format?: string) {
    super(
      400,
      `Unsupported format '${format}'. Supported formats: json, jsonp`,
    );
  }
}

export default UnsupportedFormatError;
