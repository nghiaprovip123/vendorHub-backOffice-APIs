"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewStaffList = void 0;
const view_staff_list_service_1 = require("../../services/staffs/view-staff-list.service");
const PAGE_SIZE = 10;
const getStaffList = async (_, args) => {
    try {
        const result = await (0, view_staff_list_service_1.getStaffListService)(args.input.page);
        return result;
    }
    catch (error) {
        throw new Error("Fail to fetch list of staffs");
    }
};
exports.ViewStaffList = {
    Query: {
        getStaffList,
    },
};
