/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateToken = (payload: {userId:string,role:string},secret:string,expiresIn:string) => {
  return jwt.sign(payload,secret as string , { expiresIn: '7d'} );
}