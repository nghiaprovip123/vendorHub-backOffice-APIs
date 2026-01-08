"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailableStaff = void 0;
const prisma_1 = require("../../lib/prisma");
const getAvailableStaffByBookingTime = async (_, args, ctx) => {
    const { dayOfWeek, startTime, endTime } = args.input;
    const workingHours = await prisma_1.prisma.workingHour.findMany({
        where: {
            day: dayOfWeek,
            startTime: { lte: startTime },
            endTime: { gte: endTime },
        },
        select: {
            staffId: true,
        },
    });
    const staffIds = workingHours.map(w => w.staffId);
    if (staffIds.length === 0)
        return [];
    const staffs = await prisma_1.prisma.staff.findMany({
        where: {
            id: { in: staffIds },
            isDeleted: false,
        },
    });
    return staffs;
};
exports.GetAvailableStaff = {
    Query: {
        getAvailableStaffByBookingTime,
    },
};
