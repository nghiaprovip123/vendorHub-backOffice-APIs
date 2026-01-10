import { prisma } from "@/lib/prisma"
const getMonthRange = async (date: Date) => {
    const d = new Date(date);
    const day = d.getDate();
    const setStartDateOfMonth = await d.setDate(d.getDate() - day + 1)
    const newDay = new Date(setStartDateOfMonth)
    const month = d.getMonth();
    const year = d.getFullYear();
    const getDate = newDay.getDate()
    const startDateOfMonth = new Date(year, month, getDate, 0, 0, 0, 0).getDate()
    const endDateOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999).getDate()
    return {
        startDateOfMonth,
        endDateOfMonth
    }
}

export const getBookingListInBackOfficeService = async (input: { reference: string }) => {
    const reference = input.reference
    if(!reference) {
        throw new Error("Missing current day to compute the month range");
    }
    const referenceDate = new Date(reference)
    const range = await getMonthRange(referenceDate)
    const startOfRange = String(range.startDateOfMonth) 
    const endOfRange = String(range.endDateOfMonth) 
    const result = await prisma.booking.findMany(
        {
            where: {
                day: {
                    gte: startOfRange,
                    lte: endOfRange
                }
            }
        }
    )
    const total = await prisma.booking.count(
        {
            where: {
                day: {
                    gte: startOfRange,
                    lte: endOfRange
                }   
            }
        }
    )
    return {
        bookingList: result,
        total: total
    }
}