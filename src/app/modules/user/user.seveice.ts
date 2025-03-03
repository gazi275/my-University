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

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();
    
    const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester);
    if (!admissionSemester) {
      throw new Error('Invalid admission semester');
    }
    
    console.log('Generated ID');
    userData.id = await generatedID(admissionSemester);
    
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new Error('User was not created');
    }

    console.log('User created:', newUser[0]);

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new Error('Student was not created');
    }
    
    await session.commitTransaction();
    console.log('Transaction committed');
    
    return newStudent[0];  // Return the first element
  } catch (error) {
    await session.abortTransaction();
    console.error('Error occurred during transaction:', error);
    throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
  } finally {
    await session.endSession();
    console.log('Session ended');
  }
};

export const UserServices={
  createStudentIntoDB
}
