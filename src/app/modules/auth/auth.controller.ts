import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { authSerivces } from "./auth.server";

const LoginUser = catchAsync(async (req,res)=>{
  const result = await authSerivces.LoginUser(req.body)
  const {accessToken,refreshToken,needsPasswordChange}=result
  res.cookie('refreshToken',refreshToken,{
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res,{statusCode:200,success:true,message:'User is logged in',data:{accessToken,needsPasswordChange}})
})

export const AuthControllers={
  LoginUser
}

