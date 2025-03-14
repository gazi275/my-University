/* eslint-disable no-undef */
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';
import { User } from '../user/user.model';
import { LoginSchema } from './auth.interface';
import { generateToken } from './auth.utils';
import jwt from 'jsonwebtoken';

type Ipayload = {
  oldPassword: string;
  newPassword: string;
};

const LoginUser = async (payload: LoginSchema) => {
  const user = await User.findOne({ id: payload.id });
  if (!user) {
    throw new Error('User not found');
  }
  if (user.status === 'blocked') {
    throw new Error('User is blocked');
  }
  if (user.isDeleted) {
    throw new Error('User is deleted');
  }

  if (!(await User.isPasswordMatch(payload.password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.JWT_SECRET as string,
    config.JWT_EXPIRES_IN as string,
  );
  const refreshToken = generateToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.REFRESH_EXPIRES_IN as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const forgetPassword = async (userData: JwtPayload, payload: Ipayload) => {
  const user = await User.findOne({ id: userData.userId });
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.password) {
    throw new Error('User password is missing in the database');
  }
  if (user.status === 'blocked') {
    throw new Error('User is blocked');
  }
  if (user.isDeleted) {
    throw new Error('User is deleted');
  }
  if (!(await User.isPasswordMatch(payload.oldPassword, user.password))) {
    throw new Error('Invalid credentials');
  }

  const newPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.JWT_REFRESH_SECRET as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new Error( 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new Error('This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new Error('This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new Error('You are not authorized !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.JWT_SECRET as string,
    config.JWT_EXPIRES_IN as string,
  );

  return {
    accessToken,
  };
};


export const authSerivces = {
  LoginUser,
  forgetPassword,
  refreshToken,
};
