import { deleteAssetFromCloudinary } from "@/utils/delete-image-helper"
import { deleteStaffService } from "@/services/staffs/delete-stafff.service"

const deleteStaff = async (
  _: unknown,
  args: { input: any },
  ctx: any
) => {
  try {
    const result = await deleteStaffService(args.input)
    return {
      success: true,
      message: "Successfullt delete a Product!"
    }
  }
    catch(error: any) {
      throw error
    }
  }

export const DeleteStaff = {
  Mutation: {
    deleteStaff,
  },
}
