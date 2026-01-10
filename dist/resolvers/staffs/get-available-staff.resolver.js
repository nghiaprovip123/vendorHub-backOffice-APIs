"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailableStaff = void 0;
const get_available_staff_service_1 = require("../../services/staffs/get-available-staff.service");
const getAvailableStaffByBookingTime = async (_, args, ctx) => {
    try {
        const result = await (0, get_available_staff_service_1.getAvailableStaffbyBookingTimeService)(args.input);
        return result;
    }
    catch (error) {
        throw new Error("Unknown Error");
    }
};
exports.GetAvailableStaff = {
    Query: {
        getAvailableStaffByBookingTime,
    },
};
