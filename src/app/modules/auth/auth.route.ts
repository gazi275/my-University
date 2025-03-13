import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateMiddleware from './../../middlewares/Validation';
import { loginValidationSchema } from "./auth.validation";

const router = Router();

router.post('/login',validateMiddleware(loginValidationSchema),AuthControllers.LoginUser)
export const AuthRoutes = router;




