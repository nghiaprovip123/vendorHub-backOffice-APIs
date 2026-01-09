import { prisma } from "@/lib/prisma"
const getBookingListInBackOffice = async (
    _:unknown,
    args: { input: any },
    ctx:any
) => {
    const getBookingListInBackOffice = await prisma.booking.findMany()
    const total = await prisma.booking.count()
    return {
        bookingList: getBookingListInBackOffice,
        total: total
    }
}
export const GetBookingListInBackOffice = {
    Query: {
        getBookingListInBackOffice
    }
}