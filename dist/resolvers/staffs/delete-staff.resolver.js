"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteStaff = void 0;
const delete_stafff_service_1 = require("../../services/staffs/delete-stafff.service");
const deleteStaff = async (_, args, ctx) => {
    const result = await (0, delete_stafff_service_1.deleteStaffService)(args.input);
    return {
        success: true,
        message: "Successfullt delete a Product!"
    };
};
exports.DeleteStaff = {
    Mutation: {
        deleteStaff,
    },
};
