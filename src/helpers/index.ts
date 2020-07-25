import { Request } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

function verifyToken(token:string) {
  return jwt.verify(token, config.get('jwtSecret'));
}

function getToken(req: Request) {
  return req.cookies.jwt;
}

export function isAuth(req: Request): boolean {
  try {
    const token = getToken(req);
    if (!token) {
      return false;
    }
    verifyToken(token);
  } catch (e) {
    return false;
  }

  return true;
}

export function getAuthPayload(reg: Request) {
  try {
    const token = getToken(reg);
    if (token) {
      return verifyToken(getToken(reg));
    }
    return null;
  } catch (e) {
    return null;
  }
}
