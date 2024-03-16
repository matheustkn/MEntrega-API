import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IUser } from '../interfaces/IUser';
import responseHelper from './response-helper';

const createUserToken = async (user: IUser, req: Request, res: Response) => {
  const secret: string = process.env.JWT_SECRET as string;

  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    secret,
  );

  responseHelper(res, 200, 'User authenticated successfully!', { token });
};

const getUserToken = (req: Request) => {
  const token = req.headers['authorization']?.split(' ')[1];

  return token;
};

export { createUserToken, getUserToken };
