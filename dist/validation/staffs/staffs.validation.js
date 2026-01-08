"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaffSchema = exports.updateStaffSchema = exports.createStaffSchema = exports.createWorkingHourSchema = void 0;
const zod_1 = require("zod");
exports.createWorkingHourSchema = zod_1.z.object({
    day: zod_1.z.enum([
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
        'SUN',
    ]),
    startTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
    endTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
});
exports.createStaffSchema = zod_1.z.object({
    avatar: zod_1.z.any().optional(),
    fullName: zod_1.z.string().min(2).max(100),
    timezone: zod_1.z.string(),
    isActive: zod_1.z.boolean().optional().default(true),
    isDeleted: zod_1.z.boolean().optional().default(false),
    workingHours: zod_1.z
        .array(exports.createWorkingHourSchema)
        .min(1, 'At least one working hour is required'),
});
exports.updateStaffSchema = zod_1.z.object({
    id: zod_1.z.string(),
    avatar: zod_1.z.any().optional(),
    fullName: zod_1.z.string().min(2).max(100),
    timezone: zod_1.z.string(),
    isActive: zod_1.z.boolean().optional().default(true),
    isDeleted: zod_1.z.boolean().optional().default(false),
    workingHours: zod_1.z
        .array(exports.createWorkingHourSchema)
        .min(1, 'At least one working hour is required').optional(),
});
exports.deleteStaffSchema = zod_1.z.object({
    id: zod_1.z.string(),
    public_id: zod_1.z.string(),
});
