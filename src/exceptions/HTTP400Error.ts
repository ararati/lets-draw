import BaseError from './BaseError';
import { HttpStatusCode } from './types';

export default class HTTP400Error extends BaseError {
  constructor(description = 'Bad request') {
    super('NOT FOUND', HttpStatusCode.BAD_REQUEST, description, true);
  }
}
