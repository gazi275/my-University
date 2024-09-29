/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema } from 'mongoose';
import { TAcademicSemester,  TAcademicSemesterNameCodeMapper } from './AcademicSemister.interface';


const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: ['Autumn', 'Summar', 'Fall'], required: true },
  code: { type: String, enum: ['01', '02', '03'], required: true },
  year: { type: String, required: true },
  startMonth: {
    type: String,
    enum: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    required: true,
  },
  endMonth: {
    type: String,
    enum: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    required: true,
  },
  
}
,{
  timestamps: true,
});
AcademicSemesterSchema.pre('save', async function(next){
 const isSemesterExis= await AcademicSemester.findOne({
  year:this.year,
  name: this.name
 })
 if (isSemesterExis) {
  throw new Error('Semester is alrerady exist')
  
 }
 next()
})

// eslint-disable-next-line no-unused-vars
 export const AcademicSemsterCodemappper:TAcademicSemesterNameCodeMapper={
  Autumn:'01',
  Summar: '02',
  Fall:'03'
}



export const AcademicSemester = mongoose.model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema
);
