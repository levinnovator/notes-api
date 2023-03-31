import BaseError from './BaseError';

class MissingRecordError extends BaseError {
  constructor(entityName?: string) {
    super(404, `${entityName ?? 'Document'} does not exist`);
  }
}

export default MissingRecordError;
