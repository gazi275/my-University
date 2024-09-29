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
  let isUnique = false;
  let incrementID = '';

  while (!isUnique) {
    const currentId = await findLastStudent() || (0).toString();
    incrementID = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementID = `${payload.year}${payload.code}${incrementID}`;

    // Check if the ID already exists in the database
    const existingUser = await User.findOne({ id: incrementID });
    if (!existingUser) {
      isUnique = true; // ID is unique, exit the loop
    }
  }

  return incrementID;
};
