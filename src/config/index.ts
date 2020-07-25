import convict from 'convict';
import dotenv from 'dotenv';

dotenv.config();

const config = convict({
  appSecret: {
    default: '',
    format: '*',
    env: 'APP_SECRET',
  },
  databaseURL: {
    default: '',
    format: '*',
    env: 'MONGODB_URI',
  },
  jwtSecret: {
    default: '',
    format: '*',
    env: 'JWT_SECRET',
  },
  env: {
    format: ['production', 'development'],
    default: 'development',
    env: 'ENV',
  },
  port: {
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  socketPort: {
    format: 'port',
    default: 3005,
    env: 'SOCKET_PORT',
    arg: 'socket-port',
  },
});

config.validate({ allowed: 'strict' });

export default config;
