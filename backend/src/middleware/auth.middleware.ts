import { Response, NextFunction } from 'express';
import Request  from '../types/express/index';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';

export const identifyUser = (req: Request, res: Response, next: NextFunction) => {
  
  let userId;
  let token = req.cookies?.userIdCookie;
  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
      userId = decoded.userId;
    } catch (err) {
      console.warn("Invalid JWT cookie, generating new user ID.");
      userId = uuidv4();
    }
  } else {
    userId = uuidv4();
  }

  const newToken = jwt.sign({ userId: userId }, config.jwtSecret, { expiresIn: '7d' });
  res.setHeader('Set-Cookie', cookie.serialize('userIdCookie', newToken, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
  }));

  req.user = { userId: userId };
  next();
};

