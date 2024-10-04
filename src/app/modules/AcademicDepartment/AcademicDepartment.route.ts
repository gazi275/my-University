import express from 'express'
import validateMiddleware from '../../middlewares/Validation'

import { AcademicDepartmentControllers } from './AcademicDepartment.controller'
import { createAcademicDepartmentValidationSchema, updatedDepartmentValidationSchema } from './AcademicDepartment.validations'

const router=express.Router()

router.post('/create-department',validateMiddleware(createAcademicDepartmentValidationSchema),AcademicDepartmentControllers.createAcademicDepart)
router.patch('/:id',validateMiddleware(updatedDepartmentValidationSchema),AcademicDepartmentControllers.updatedAcademicDepartment)
router.get('/',AcademicDepartmentControllers.getAllAcademeicDepartment)

export const AcademicDepartmentRoute=router