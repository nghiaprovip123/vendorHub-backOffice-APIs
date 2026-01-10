"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewBookingDetailInBackOfficeService = void 0;
const prisma_1 = require("../../lib/prisma");
const viewBookingDetailInBackOfficeService = async (bookingId) => {
    if (!bookingId) {
        throw new Error("Missing Booking ID Information");
    }
    const viewBookingDetailInBackOffice = await prisma_1.prisma.booking.findFirst({
        where: { id: bookingId }
    });
    if (!viewBookingDetailInBackOffice) {
        throw new Error("Booking Detail doesn't not exist");
    }
    return viewBookingDetailInBackOffice;
};
exports.viewBookingDetailInBackOfficeService = viewBookingDetailInBackOfficeService;
