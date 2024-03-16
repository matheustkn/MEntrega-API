import { model, Schema } from 'mongoose';

import { IUser } from '../interfaces/IUser';

const user = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

export const User = model<IUser>('user', user);
