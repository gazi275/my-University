import QueryBuilder from '../../Builder/QueryBuilder';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query:Record<string, unknown>) => {
  const studentSearchableFields: string[] = ['email', 'name.firstName', 'name.lastName'];

    // Use QueryBuilder to construct the query with all necessary methods
    const studentQuery = new QueryBuilder(
      Student.find(),query
    )
      .search(studentSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await studentQuery.modelQuery;
    return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};