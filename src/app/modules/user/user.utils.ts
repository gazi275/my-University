import { TAcademicSemester } from "../AcademicSemister/AcademicSemister.interface";
import { User } from "./user.model";

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    { role: "student" },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();



  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedID = async (payload: TAcademicSemester) => {
  let currentId = "0000"; 

  const lastStudentId = await findLastStudent();
  if (!lastStudentId) {
   
    return `${payload.year}${payload.code}${currentId}`;
  }

  const lastStudentSemesterCode = lastStudentId.substring(4, 6);
  const lastStudentYear = lastStudentId.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  


  if (lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;



  return incrementId;
};
