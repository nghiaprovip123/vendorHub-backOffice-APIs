import { getBookingListInBackOfficeService } from "@/services/booking/get-booking-list-by-month-service"
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