import BaseError from './BaseError';

class ValidationError<T> extends BaseError {
  errors: T[];

  constructor(errors: T[]) {
    super(400, JSON.stringify(errors));

    this.errors = errors;
  }
}

export default ValidationError;
