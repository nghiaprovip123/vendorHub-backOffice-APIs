import { prisma } from "@/lib/prisma"
import { deleteAssetFromCloudinary } from "@/utils/delete-image-helper"
import * as z from "zod"
import { deleteStaffSchema } from "@/validation/staffs/staffs.validation"

type DeleteStaffInput = z.infer<typeof deleteStaffSchema>

export const deleteStaffService = async (input: DeleteStaffInput) => {
  if (!input.id) {
    throw new Error("Missing Deleted Staff ID")
  }

  const staff = await prisma.$transaction(async (tx) => {
    const existing = await tx.staff.findUnique({
      where: { id: input.id },
    })

    if (!existing) {
      throw new Error("Staff not found")
    }

    await tx.workingHour.deleteMany({
      where: { staffId: input.id },
    })

    return tx.staff.delete({
      where: { id: input.id },
    })
  })

  if (input.public_id) {
    try {
      await deleteAssetFromCloudinary(input.public_id)
    } catch (err) {
      console.error("Cloudinary delete failed:", err)
    }
  }

  return staff
}
