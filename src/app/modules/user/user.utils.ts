import { TAcademicSemester } from "../AcademicSemister/AcademicSemister.interface"
import { User } from "./user.model";

// Function to find the last student ID
const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 }
  ).sort({ createdAt: -1 }).lean();
  
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// Generate a new unique student ID
export const generatedID = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); // 0000 by deafult

  const lastStudentId = await findLastStudent();
  // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); // 00001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
