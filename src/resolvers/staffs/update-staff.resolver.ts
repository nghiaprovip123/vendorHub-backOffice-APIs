import { GraphQLUpload } from "graphql-upload-minimal";
import { updateStaffService } from "@/services/staffs/update-staff.service"
const updateStaff = async (
    _: unknown,
    args: { input: any },
    ctx: any
) => {
    try {
        const updateStaff = updateStaffService(args.input)
        return updateStaff
    } catch (error: any) {
        throw error
    }
}

export const UpdateStaff = {
    Upload: GraphQLUpload, 
    Mutation : {
        updateStaff
    }
}