import jwt from 'jsonwebtoken';

import responseHelper from '../helpers/response-helper';
import { getUserToken } from '../helpers/tokens';

const verifyToken = (req: any, res: any, next: any) => {
  const token = getUserToken(req);

  if (!token) {
    return responseHelper(res, 403, 'A token is required for authentication');
  }

  try {
    const secret: string = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch (error: any) {
    return responseHelper(res, 401, 'Invalid token');
  }
};

export default verifyToken;
