import mongoose from "mongoose";
import { AcademicSemester } from "../AcademicSemister/AcademicSemester.model";
import { Student } from "../student/student.model";
import { User } from "./user.model";
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { generatedID } from "./user.utils";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password as string;
  userData.role = 'student';

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

    // Log the new student to confirm creation
   

    return newStudent[0];  // Return the first element
  } catch (error) {
    await session.abortTransaction();
    throw new Error('error occurs')
    
  } finally {
    await session.endSession();
  }
};
export const UserServices={
  createStudentIntoDB
}
