"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableStaffbyBookingTimeService = void 0;
const prisma_1 = require("../../lib/prisma");
const getAvailableStaffbyBookingTimeService = async (input) => {
    try {
        console.log(input);
        const { day, startTime, endTime } = input;
        const getAcceptableWorkingHourbyBookingTime = await prisma_1.prisma.workingHour.findMany({
            where: {
                day: day,
                startTime: { lte: startTime },
                endTime: { gte: endTime }
            },
            select: {
                staffId: true
            }
        });
        const createStaffIdsArray = getAcceptableWorkingHourbyBookingTime.map((w) => w.staffId);
        if (createStaffIdsArray.length === 0) {
            return [];
        }
        const staff = await Promise.all(createStaffIdsArray.map((staffs) => {
            const findStaff = prisma_1.prisma.staff.findFirst({
                where: {
                    id: staffs,
                    isDeleted: false,
                }
            });
            return findStaff;
        }));
        return staff;
    }
    catch (error) {
        throw new Error("Fail to Get Available Staff");
    }
};
exports.getAvailableStaffbyBookingTimeService = getAvailableStaffbyBookingTimeService;
