import express from 'express';
import validateMiddleware from '../../middlewares/Validation';
import { AcademicFacultyValidation } from './AcademicFeculty.validation';
import { AcademicFacultyControllers } from './AcademicFeculty.controller';



const router = express.Router();

router.post(
  '/create-academic-feculty',
  validateMiddleware(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateMiddleware(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFecultyRoutes = router;