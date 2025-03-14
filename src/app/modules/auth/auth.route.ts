import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateMiddleware from './../../middlewares/Validation';
import { forgetPasswordSchema, loginValidationSchema } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.interface";

const router = Router();

router.post('/login',validateMiddleware(loginValidationSchema),AuthControllers.LoginUser)
router.post('/change-password',auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),validateMiddleware(forgetPasswordSchema),AuthControllers.forgetPassword)
export const AuthRoutes = router;




