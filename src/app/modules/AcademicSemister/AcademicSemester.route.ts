import express  from "express";
import validateMiddleware from "../../middlewares/Validation";
import { AcademicSemesterSchema, UpdatedAcademicSemesterSchema } from "./AcademicSemester.validation";
import { AcademicSemeseterController } from "./AcademicSemester.controller";


const router=express.Router()
router.post('/create-academic-semester',validateMiddleware(AcademicSemesterSchema),AcademicSemeseterController.CreateSemester)
router.get('/:id',AcademicSemeseterController.getSingleAcademicSemester)
router.patch('/:id',validateMiddleware(UpdatedAcademicSemesterSchema),AcademicSemeseterController.upDatededSemester)
router.get('/',AcademicSemeseterController.getAllAcademicSemester)
export const AcademicSemesterRoute=router
