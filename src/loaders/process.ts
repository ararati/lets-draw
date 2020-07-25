import { errorHandler } from '../exceptions/ErrorHandler';

export default () => {
  process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    throw reason;
  });

  process.on('uncaughtException', (error: Error) => {
    errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) {
      // TODO: Add process manager for auto restart the app, like pm2
      // Otherwise, this line completely stops the application on error.
      process.exit(1);
    }
  });
};
