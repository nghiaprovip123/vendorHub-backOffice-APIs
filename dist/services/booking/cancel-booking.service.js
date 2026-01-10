"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBookingSerivce = void 0;
const prisma_1 = require("../../lib/prisma");
const cancelBookingSerivce = async (input) => {
    if (!input.bookingId) {
        throw new Error("Missing Booking ID");
    }
    const checkBookingId = await prisma_1.prisma.booking.findFirst({
        where: {
            id: input.bookingId,
            status: {
                in: [
                    "Đã xếp lịch",
                    "Chờ xếp lịch",
                    "Sắp diễn ra",
                    "Đang diễn ra"
                ]
            }
        }
    });
    if (!checkBookingId) {
        throw new Error("Booking ID doesn't exist or can't be cancelled");
    }
    const cancelBooking = await prisma_1.prisma.booking.update({
        where: { id: checkBookingId.id },
        data: {
            status: "Đã huỷ",
            cancelReason: input.cancelReason,
        }
    });
    return cancelBooking;
};
exports.cancelBookingSerivce = cancelBookingSerivce;
