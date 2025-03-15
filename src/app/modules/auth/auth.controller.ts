
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { authSerivces } from './auth.service';

const LoginUser = catchAsync(async (req, res) => {
  const result = await authSerivces.LoginUser(req.body);
  const { accessToken, refreshToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in',
    data: { accessToken, needsPasswordChange },
  });
});
const changePassword = catchAsync(async (req, res) => {

  const result = await authSerivces.changePassword(req.user,req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});
const refreshtoken = catchAsync(async (req, res) => {
  const result = await authSerivces.refreshToken(req.cookies.refreshToken);
  sendResponse(res, {
    statusCode: 200,  
    success: true,
    message: 'Token is refreshed',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id
  console.log(userId);
  const result = await authSerivces.requestPasswordReset(userId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});



export const AuthControllers = {
  LoginUser,
  changePassword,
  refreshtoken,
  forgetPassword,
};
