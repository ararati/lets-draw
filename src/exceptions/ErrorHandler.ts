import BaseError from './BaseError';
import logger from "../components/logger";

class ErrorHandler {
  public async handleError(err: Error) {
    await logger.error('Error message from the error-handling component', err);
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
