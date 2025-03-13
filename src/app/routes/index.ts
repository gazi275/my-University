import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/AcademicSemister/AcademicSemester.route';
import { AcademicDepartmentRoute } from '../modules/AcademicDepartment/AcademicDepartment.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoute
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute
  },
  {
    path: '/auth',
    route: AuthRoutes
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;