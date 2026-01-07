import { deleteAssetFromCloudinary } from "@/utils/delete-image-helper"
import { prisma } from "@/lib/prisma"

const deleteStaff = async (
  _: unknown,
  args: { input: { id: string; public_id?: string } },
  ctx: any
) => {
  let deletedStaff

  try {
    deletedStaff = await prisma.$transaction(async (tx) => {
      await tx.workingHour.deleteMany({
        where: { staffId: args.input.id },
      })

      return tx.staff.delete({
        where: { id: args.input.id },
      })
    })
  } catch (error) {
    throw new Error("Failed to delete staff from database")
  }

  // Side-effect AFTER DB success
  if (args.input.public_id) {
      await deleteAssetFromCloudinary(args.input.public_id)
  }

  return deletedStaff
}

export const DeleteStaff = {
  Mutation: {
    deleteStaff,
  },
}
