"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
// resolvers/index.ts
// import { productResolver } from "./products.resolvers";
const create_staff_resolver_1 = require("./staffs/create-staff.resolver");
const update_staff_resolver_1 = require("./staffs/update-staff.resolver");
const delete_staff_resolver_1 = require("./staffs/delete-staff.resolver");
const view_staff_list_resolver_1 = require("./staffs/view-staff-list.resolver");
const get_available_staff_resolver_1 = require("./staffs/get-available-staff.resolver");
const create_booking_resolver_1 = require("./booking/create-booking.resolver");
const assign_staff_resolver_1 = require("./booking/assign-staff.resolver");
const cancel_booking_resolver_1 = require("./booking/cancel-booking.resolver");
const view_booking_detail_resolver_1 = require("./booking/view-booking-detail.resolver");
const get_booking_list_by_week_resolver_1 = require("./booking/get-booking-list-by-week.resolver");
exports.resolvers = [
    // productResolver,
    create_staff_resolver_1.CreateStaff,
    update_staff_resolver_1.UpdateStaff,
    delete_staff_resolver_1.DeleteStaff,
    view_staff_list_resolver_1.ViewStaffList,
    get_available_staff_resolver_1.GetAvailableStaff,
    create_booking_resolver_1.CreateBookingByCustomer,
    assign_staff_resolver_1.AssignStaffByBookingRequest,
    cancel_booking_resolver_1.CancelBooking,
    view_booking_detail_resolver_1.ViewBookingDetailInBackOffce,
    get_booking_list_by_week_resolver_1.GetBookingListInBackOfficeByWeek
];
