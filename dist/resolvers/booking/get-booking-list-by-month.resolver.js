"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBookingListInBackOfficeByMonth = void 0;
const get_booking_list_by_month_service_1 = require("../../services/booking/get-booking-list-by-month-service");
const getBookingListInBackOfficeByMonth = async (_, args, ctx) => {
    try {
        const result = await (0, get_booking_list_by_month_service_1.getBookingListInBackOfficeService)(args.input);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.GetBookingListInBackOfficeByMonth = {
    Query: {
        getBookingListInBackOfficeByMonth
    }
};
