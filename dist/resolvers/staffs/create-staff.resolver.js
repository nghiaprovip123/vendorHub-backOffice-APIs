"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStaff = void 0;
const graphql_upload_minimal_1 = require("graphql-upload-minimal");
const create_staff_service_1 = require("../../services/staffs/create-staff.service");
const createStaff = async (_, args, ctx) => {
    try {
        const createStaff = await (0, create_staff_service_1.createStaffService)(args.input);
        return createStaff;
    }
    catch (error) {
        console.error("Error creating staff:", error);
        throw error;
    }
};
exports.CreateStaff = {
    Upload: graphql_upload_minimal_1.GraphQLUpload,
    Mutation: {
        createStaff
    }
};
