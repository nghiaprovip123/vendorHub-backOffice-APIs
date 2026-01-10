import { prisma } from "@/lib/prisma"
import { getBookingListInBackOfficeService } from "@/services/booking/get-booking-list-by-month-service"
const getMonthRange = async (date: Date) => {
    const d = new Date(date);
    const day = d.getDate();
    const setStartDateOfMonth = await d.setDate(d.getDate() - day + 1)
    const newDay = new Date(setStartDateOfMonth)
    const month = d.getMonth();
    console.log(month)
    const year = d.getFullYear();
    const getDate = newDay.getDate()
    const startDateOfMonth = new Date(year, month, getDate, 0, 0, 0, 0).getDate()
    console.log(startDateOfMonth)
    const endDateOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999).getDate()
    console.log(endDateOfMonth)
    return {
        startDateOfMonth,
        endDateOfMonth
    }
}

const getBookingListInBackOfficeByMonth = async(
    _: unknown,
    args: { input: any },
    ctx: any
) => {
    try {
        const result = await getBookingListInBackOfficeService(args.input)
        return result
    }
    catch (error: any) {
        throw error
    }
}

export const GetBookingListInBackOfficeByMonth = {
    Query: {
        getBookingListInBackOfficeByMonth
    }
}