"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingByCustomerService = void 0;
const prisma_1 = require("../../lib/prisma");
const createBookingByCustomerService = async (input) => {
    const { serviceId, staffId, day, dayOfWeek, startTime, endTime, customerName, customerPhone, customerEmail, notes, } = input;
    if (!serviceId) {
        throw new Error("Missing Service Information");
    }
    const checkStaffID = Boolean(staffId);
    const processStatus = checkStaffID ? "Đã đặt lịch" : "Chờ xác nhận";
    const createBookingByCustomerService = await prisma_1.prisma.booking.create({
        data: {
            serviceId: serviceId,
            staffId: staffId,
            day: day,
            dayOfWeek: dayOfWeek,
            startTime: startTime,
            endTime: endTime,
            customerName: customerName,
            customerPhone: customerPhone,
            customerEmail: customerEmail,
            notes: notes,
            status: processStatus
        }
    });
    return createBookingByCustomerService;
};
exports.createBookingByCustomerService = createBookingByCustomerService;
