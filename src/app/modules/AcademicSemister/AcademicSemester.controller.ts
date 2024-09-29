import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterSevices } from "./AcademicSemester.service";

const CreateSemester=catchAsync(async(req,res)=>{
    
    const result=await AcademicSemesterSevices.CreateSemesterServise(req.body) 

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message:'Academic semester is created successfully',
        data: result
    })
})

const getAllAcademicSemester=catchAsync(async(req,res)=>{
    const result=await AcademicSemesterSevices.getSemesterServises()
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true, 
        message: 'get all the semester',
        data: result
    })

})
const getSingleAcademicSemester=catchAsync(async(req,res)=>{
     const {id}=req.params
   
    const result=await AcademicSemesterSevices.getSingleSemesterService(id)
    sendResponse(res,{statusCode:httpStatus.OK,success:true,message:'data retrived successfully',data:result})
})

const upDatededSemester=catchAsync(async(req,res)=>
{
const {id}=req.params
const result=await AcademicSemesterSevices.updatedSemesterServices(id,req.body)

sendResponse(res,{
    statusCode:httpStatus.OK,success:true,message:'Semester is updated',data:result
})

})

 export const AcademicSemeseterController={
    CreateSemester,getAllAcademicSemester,getSingleAcademicSemester,upDatededSemester
}