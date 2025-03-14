import { NextFunction, Request, Response } from 'express';

import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import { Error } from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';




const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    // checking if the token is missing
    if (!token) {
      throw new Error('You are not authorized !');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.JWT_SECRET as string,
    ) as JwtPayload;
   

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { role, userId, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new Error('This user is not found !');
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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized  hi!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
