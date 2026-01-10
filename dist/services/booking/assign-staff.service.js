"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignStaffByBookingRequestService = void 0;
const prisma_1 = require("../../lib/prisma");
const assignStaffByBookingRequestService = async (input) => {
    if (!input.bookingId) {
        throw new Error("Missing Booking ID!");
    }
    const findBookingInformation = await prisma_1.prisma.booking.findFirst({
        where: { id: input.bookingId,
            status: "Chờ xếp lịch"
        }
    });
    if (!findBookingInformation) {
        throw new Error("The Booking doesn't available for Staff Assignment!");
    }
    const assignBookingInformation = await prisma_1.prisma.booking.update({
        where: { id: findBookingInformation.id },
        data: {
            staffId: input.staffId,
            status: "Đã xếp lịch"
        }
    });
    return assignBookingInformation;
};
exports.assignStaffByBookingRequestService = assignStaffByBookingRequestService;
