import { TAcademicSemester } from "../AcademicSemister/AcademicSemister.interface";
import { User } from "./user.model";

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    { role: "student" },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  console.log("Last Student ID:", lastStudent?.id);

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedID = async (payload: TAcademicSemester) => {
  let currentId = "0000"; // Default ID jodi kono student na thake

  const lastStudentId = await findLastStudent();
  if (!lastStudentId) {
    console.log("No last student found, starting from:", payload.year + payload.code + currentId);
    return `${payload.year}${payload.code}${currentId}`;
  }

  const lastStudentSemesterCode = lastStudentId.substring(4, 6);
  const lastStudentYear = lastStudentId.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  console.log(
    "Last Student Data:",
    lastStudentId,
    "| Semester Code:",
    lastStudentSemesterCode,
    "| Year:",
    lastStudentYear
  );
  console.log("Current Data:", currentSemesterCode, currentYear);

  if (lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  console.log("Generated New ID:", incrementId);

  return incrementId;
};
