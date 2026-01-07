import { prisma } from "@/lib/prisma"

const PAGE_SIZE = 10

export const getStaffListService = async ( page: number) => {
  try {
    const getPage = page ?? 1
    const skip = (getPage - 1) * PAGE_SIZE

    const staffs = await prisma.staff.findMany({
      skip,
      take: PAGE_SIZE,
    })

    return staffs
  } catch (error) {
    throw new Error("Fail to fetch list of staffs")
  }
}
