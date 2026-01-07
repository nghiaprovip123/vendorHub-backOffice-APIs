import { prisma } from "@/lib/prisma"
import { getStaffListService } from "@/services/staffs/view-staff-list.service"
const PAGE_SIZE = 10

const getStaffList = async (
  _: unknown,
  args: { input: { page: number } }
) => {
  try {
    const result = await getStaffListService(args.input.page);
    return result;
  } catch (error) {
    throw new Error("Fail to fetch list of staffs")
  }
}

export const ViewStaffList = {
  Query: {
    getStaffList,
  },
}
