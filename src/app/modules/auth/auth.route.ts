import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateMiddleware from './../../middlewares/Validation';
import { forgetPasswordSchema, loginValidationSchema, refreshTokenValidationSchema } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.interface';

const router = Router();

router.post(
  '/login',
  validateMiddleware(loginValidationSchema),
  AuthControllers.LoginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateMiddleware(forgetPasswordSchema),
  AuthControllers.changePassword,
);

router.post('refresh-token',validateMiddleware(refreshTokenValidationSchema) ,AuthControllers.refreshtoken);
export const AuthRoutes = router;
