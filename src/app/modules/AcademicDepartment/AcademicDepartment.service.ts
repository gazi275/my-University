import { TAcademicDepartment } from "./AcademicDepartment.interface";
import { AcademicDepartment } from "./AcademicDepartment.model";

const createAcademicDepartmentIntoDB=async(payload:TAcademicDepartment)=>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
     const result= await AcademicDepartment.create(payload)
     return result

}

const singleAcademicDepartment=async()=>{
    const result = await AcademicDepartment.find()
    return result
}
const updatedDepartmentService=async(departmentID:string,payload:Partial<TAcademicDepartment>)=>{
   const result =await AcademicDepartment.findOneAndUpdate({departmentID},payload,{new:true})
   return result 
}

export const AcademicDepartmentServices={
    createAcademicDepartmentIntoDB,
    singleAcademicDepartment,
    updatedDepartmentService
}