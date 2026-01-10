"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBookingListInBackOfficeByWeek = void 0;
const get_booking_list_by_week_service_1 = require("../../services/booking/get-booking-list-by-week.service");
const getBookingListInBackOfficeByWeek = async (_, args, ctx) => {
    try {
        const result = await (0, get_booking_list_by_week_service_1.getBookingListInBackOfficeByWeekService)(args.input);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.GetBookingListInBackOfficeByWeek = {
    Query: {
        getBookingListInBackOfficeByWeek
    }
};
