/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


export const USER_ROLE = {
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
} as const;

export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
  };

  export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByCustomId(id: string): Promise<TUser>;
    
    isPasswordMatch(
      // eslint-disable-next-line no-unused-vars
      password: string,
      hash: string,
    ): Promise<boolean>;
  }

  export type TUserRole = keyof typeof USER_ROLE;
