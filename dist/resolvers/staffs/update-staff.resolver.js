"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStaff = void 0;
const graphql_upload_minimal_1 = require("graphql-upload-minimal");
const update_staff_service_1 = require("../../services/staffs/update-staff.service");
const updateStaff = async (_, args, ctx) => {
    try {
        const updateStaff = (0, update_staff_service_1.updateStaffService)(args.input);
        return updateStaff;
    }
    catch (error) {
        throw error;
    }
};
exports.UpdateStaff = {
    Upload: graphql_upload_minimal_1.GraphQLUpload,
    Mutation: {
        updateStaff
    }
};
