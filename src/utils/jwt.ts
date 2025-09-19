import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';


export function signToken(payload: object) {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '15m' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET);
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, ENV.JWT_SECRET + '_refresh', { expiresIn: '7d' });
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET + '_refresh');
}
