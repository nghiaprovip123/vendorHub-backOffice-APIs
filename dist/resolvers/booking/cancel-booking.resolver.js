"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelBooking = void 0;
const cancel_booking_service_1 = require("../../services/booking/cancel-booking.service");
const cancelBooking = async (_, args, ctx) => {
    try {
        const result = await (0, cancel_booking_service_1.cancelBookingSerivce)(args.input);
        return {
            success: true,
            message: "Successfully cancel Booking",
            booking: result
        };
    }
    catch (error) {
        throw error;
    }
};
exports.CancelBooking = {
    Mutation: {
        cancelBooking
    }
};
