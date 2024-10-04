import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import  httpStatus  from 'http-status';
import { AcademicDepartmentServices } from "./AcademicDepartment.service";

const createAcademicDepart=catchAsync(async(req,res)=>{
    const result=await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)
    sendResponse(res,{statusCode:httpStatus.OK,success:true,message:'academic department is created',data:result})
})

const getAllAcademeicDepartment=catchAsync(async(req,res)=>{
    const result = await AcademicDepartmentServices.singleAcademicDepartment()
    sendResponse(res,{statusCode:httpStatus.OK,success:true,message:'academic department is retrived',data:result})

})
const updatedAcademicDepartment=catchAsync(async(req,res)=>{
    const AcademicID=req.params
    
    const result=await AcademicDepartmentServices.updatedDepartmentService(AcademicID,req.body)
    sendResponse(res,{statusCode:httpStatus.OK,success:true,message:'academic department is updated',data:result})

})

export const AcademicDepartmentControllers={
    createAcademicDepart,getAllAcademeicDepartment,updatedAcademicDepartment
}