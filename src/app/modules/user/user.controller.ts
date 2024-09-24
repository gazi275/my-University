import httpStatus from 'http-status';

import {  RequestHandler,   } from 'express';

import { UserServices } from './user.seveice';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';



const createStudent:RequestHandler =catchAsync( async (
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next,
) => {
 
    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } 
  
)

export const UserControllers = {
  createStudent,
};