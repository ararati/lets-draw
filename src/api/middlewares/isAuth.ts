import { Request } from 'express';
import jwt from 'express-jwt';
import config from '../../config';

const getTokenFromHeader = (req:Request) => {
  const token = req.cookies.jwt;

  return token || null;
};

const isAuth = jwt({
  secret: config.get('jwtSecret'),
  userProperty: 'token',
  getToken: getTokenFromHeader,
  algorithms: ['HS256'],
});

export default isAuth;
