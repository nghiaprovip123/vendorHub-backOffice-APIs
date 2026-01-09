import { prisma } from "@/lib/prisma"

type getBookingListInBackOfficeByWeekServiceType = {
    reference: string
}
const parseLocalDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number)
    return new Date(y, m - 1, d) // local time, 00:00
  }
  
export const getBookingListInBackOfficeByWeekService = async ( input: getBookingListInBackOfficeByWeekServiceType ) => {
    const { reference } = input
  
    if (!reference) {
      throw new Error("Missing referenceDate")
    }

    const getISOWeekRange = (date: Date) => {
        const d = new Date(date)

        const day = d.getDay() === 0 ? 7 : d.getDay()
        d.setDate(d.getDate() - day + 1)
        const startOfWeek = new Date(d)
        startOfWeek.setHours(0, 0, 0, 0)

        const endOfWeek = new Date(d)
        endOfWeek.setDate(d.getDate() + 6)
        endOfWeek.setHours(23, 59, 59, 999)
        return {
            startOfWeek, endOfWeek
        }
    }
    const referenceDate = parseLocalDate(input.reference)

    const { startOfWeek, endOfWeek } = getISOWeekRange(
      new Date(referenceDate)
    )
  
    const start = startOfWeek.toISOString().slice(0, 10)
    const end = endOfWeek.toISOString().slice(0, 10)
  
    const bookingList = await prisma.booking.findMany({
      where: {
        day: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        day: "asc",
      },
    })
  
    const total = await prisma.booking.count({
      where: {
        day: {
          gte: start,
          lte: end,
        },
      },
    })
  
    return {
      bookingList,
      total,
    }
  }