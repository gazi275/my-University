import { AcademicSemester, AcademicSemsterCodemappper } from "./AcademicSemester.model"
import { TAcademicSemester } from "./AcademicSemister.interface"

const CreateSemesterServise=async(payload:TAcademicSemester)=>{
    if (AcademicSemsterCodemappper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code: Name and Code do not match');
      }
     const result= await AcademicSemester.create(payload) 
     return result
}
const getSemesterServises=async()=>
{
    const result= await AcademicSemester.find()
    return result
}

const getSingleSemesterService=async(id:string)=>{
    const result=await AcademicSemester.findById(id)
    return result   
}

const updatedSemesterServices = async (id: string, payload: Partial<TAcademicSemester>) => {
    // Validate if the provided name and code are correct
    if (payload.name && payload.code && AcademicSemsterCodemappper[payload.name] !== payload.code) {
      // Ensure the semester name corresponds to the correct code
      
        throw new Error('Invalide code or Semester is already exist');
     
    }
    const result=await AcademicSemester.findOneAndUpdate({id},payload,{new:true})
    return result
}
export const AcademicSemesterSevices={
    CreateSemesterServise,getSemesterServises,getSingleSemesterService,updatedSemesterServices

}