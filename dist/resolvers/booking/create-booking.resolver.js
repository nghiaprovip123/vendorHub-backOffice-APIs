"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingByCustomer = void 0;
const create_booking_service_1 = require("../../services/booking/create-booking.service");
const createBookingByCustomer = async (_, args, ctx) => {
    try {
        const result = await (0, create_booking_service_1.createBookingByCustomerService)(args.input);
        return result;
    }
    catch (error) {
        throw new Error("Fail to create new Booking by Customer");
    }
};
exports.CreateBookingByCustomer = {
    Mutation: {
        createBookingByCustomer
    }
};
