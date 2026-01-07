import { z } from 'zod';

export const createWorkingHourSchema = z.object({
  day: z.enum([
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
  ]),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
});

export const createStaffSchema = z.object({
    avatar: z.any().optional(), 
    fullName: z.string().min(2).max(100),
    timezone: z.string(),
    isActive: z.boolean().optional().default(true),
    isDeleted: z.boolean().optional().default(false),
    workingHours: z
      .array(createWorkingHourSchema)
      .min(1, 'At least one working hour is required'),
  });
  