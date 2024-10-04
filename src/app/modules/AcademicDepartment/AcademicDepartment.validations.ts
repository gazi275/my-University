import { z } from 'zod';

 export const createAcademicDepartmentValidationSchema = z.object({
 
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty must be string',
      required_error: 'Faculty is required',
    }),
    
  
});
 export const updatedDepartmentValidationSchema = z.object({
 
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is required'
    
    }).optional(),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty must be string',
      required_error: 'Faculty is required',
    }).optional(),
    
  
});