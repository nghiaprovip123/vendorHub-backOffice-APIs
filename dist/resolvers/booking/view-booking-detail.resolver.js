"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewBookingDetailInBackOffce = void 0;
const view_booking_detail_service_1 = require("../../services/booking/view-booking-detail.service");
const viewBookingDetailInBackOffice = async (_, args, ctx) => {
    try {
        const result = await (0, view_booking_detail_service_1.viewBookingDetailInBackOfficeService)(args.input.bookingId);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.ViewBookingDetailInBackOffce = {
    Query: {
        viewBookingDetailInBackOffice
    }
};
