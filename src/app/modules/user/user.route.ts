import express from 'express';
import { UserControllers } from './user.controller';

import { studentCreateValidationSchema } from '../student/student.validation';
import validateMiddleware from '../../middlewares/Validation';
import auth from './../../middlewares/auth';
import { USER_ROLE } from './user.interface';
const router = express.Router();



router.post('/create-student',auth(USER_ROLE.admin),validateMiddleware(studentCreateValidationSchema), UserControllers.createStudent);

export const UserRoutes = router;