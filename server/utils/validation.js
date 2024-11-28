import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  secondName: z.string().min(1, 'Second name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  admissionNumber: z.string().min(1, 'Admission number is required'),
  course: z.string().min(1, 'Course is required'),
  gender: z.enum(['male', 'female', 'other']),
  ntaLevel: z.number().int().min(1).max(3),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  admissionNumber: z.string().min(1, 'Admission number is required'),
  password: z.string().min(1, 'Password is required'),
});

export const timetableEntrySchema = z.object({
  day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  courseCode: z.string().min(1),
  location: z.string().min(1),
  lecturer: z.string().min(1),
});