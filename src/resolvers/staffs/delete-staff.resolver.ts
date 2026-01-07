import { deleteAssetFromCloudinary } from "@/utils/delete-image-helper"
import { deleteStaffService } from "@/services/staffs/delete-stafff.service"

const deleteStaff = async (
  _: unknown,
  args: { input: any },
  ctx: any
) => {
    const result = await deleteStaffService(args.input)
    return {
      success: true,
      message: "Successfullt delete a Product!"
    }
}

export const DeleteStaff = {
  Mutation: {
    deleteStaff,
  },
}
