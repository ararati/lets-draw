import winston from 'winston';
import formatter from './formatter';
import config from '../../config';
import { customLevels } from './types';

export default class Logger {
  private logger: winston.Logger;

  constructor() {
    const prodTransport = new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    });
    const transport = new winston.transports.Console({
      format: formatter,
    });
    const isDevEnv = config.get('env') === 'development';
    this.logger = winston.createLogger({
      level: isDevEnv ? 'trace' : 'error',
      levels: customLevels.levels,
      transports: [isDevEnv ? transport : prodTransport],
    });
    winston.addColors(customLevels.colors);
  }

  trace(msg: any, meta?: any) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
  }

  fatal(msg: any, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}
