import { z } from 'zod';

const MonthsSchema = z.enum([
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
]);

const AcademicSemesterNameSchema = z.enum(['Autumn', 'Summar', 'Fall']);
const AcademicSemesterCodeSchema = z.enum(['01', '02', '03']);

export const AcademicSemesterSchema = z.object({
  name: AcademicSemesterNameSchema,
  code: AcademicSemesterCodeSchema,
  year: z.string().min(4).max(4), // Assuming it's a 4-digit year like "2024"
  startMonth: MonthsSchema,
  endMonth: MonthsSchema,
});

export const UpdatedAcademicSemesterSchema = z.object({
  name: AcademicSemesterNameSchema.optional(),
  code: AcademicSemesterCodeSchema.optional(),
  year: z.string().min(4).max(4).optional(), // Assuming it's a 4-digit year like "2024"
  startMonth: MonthsSchema.optional(),
  endMonth: MonthsSchema.optional(),
});
