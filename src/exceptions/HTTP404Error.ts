import BaseError from './BaseError';
import { HttpStatusCode } from './types';

export default class HTTP404Error extends BaseError {
  constructor(description = 'Bad request') {
    super('NOT FOUND', HttpStatusCode.NOT_FOUND, description, true);
  }
}
