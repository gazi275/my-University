import express from 'express';
import { UserControllers } from './user.controller';

import { studentCreateValidationSchema } from '../student/student.validation';
import validateMiddleware from '../../middlewares/Validation';
const router = express.Router();



router.post('/create-student',validateMiddleware(studentCreateValidationSchema), UserControllers.createStudent);

export const UserRoutes = router;