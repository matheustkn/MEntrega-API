import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import responseHelper from '../helpers/response-helper';
import { createUserToken } from '../helpers/tokens';
import { User } from '../models/user';

const signup = async (req: Request, res: Response) => {
  try {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const result = await user.save();

    await createUserToken(result, req, res);
  } catch (error: any) {
    return responseHelper(res, 500, error.message);
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await User.findOne({ email }).then((user) => {
      if (!user) {
        return responseHelper(res, 404, 'User not found');
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return responseHelper(res, 401, 'Invalid password');
      }

      createUserToken(user, req, res);
    });
  } catch (error: any) {
    return responseHelper(res, 500, error.message);
  }
};

const test = async (req: Request, res: Response) => {
  return responseHelper(res, 200, 'User authenticated successfully!');
};

export default {
  signup,
  login,
  test,
};
