export interface BaseErrorConstructor {
  code: number;
  message: string;
}

class BaseError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);

    this.code = code;
  }
}

export default BaseError;
