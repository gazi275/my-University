import mongoose from "mongoose";
import { AcademicSemester } from "../AcademicSemister/AcademicSemester.model";
import { Student } from "../student/student.model";
import { User } from "./user.model";
import { generatedID } from "./user.utils";
import config from "../../config";
import { TUser } from "./user.interface";
import { TStudent } from "../student/student.interface";

  const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password as string;
  userData.role = 'student';
  userData.email = studentData.email;

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();
    
    const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester);
    if (!admissionSemester) {
      throw new Error('Invalid admission semester');
    }
    

    userData.id = await generatedID(admissionSemester);
    
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new Error('User was not created');
    }

 

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new Error('Student was not created');
    }
    
    await session.commitTransaction();
  
    
    return newStudent[0];  // Return the first element
  } catch (error) {
    await session.abortTransaction();

    throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
  } finally {
    await session.endSession();
   
  }
};

export const UserServices={
  createStudentIntoDB
}
