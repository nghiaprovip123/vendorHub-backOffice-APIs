import { getBookingListInBackOfficeByWeekService } from "@/services/booking/get-booking-list-by-week.service"
const getBookingListInBackOfficeByWeek = async (
    _: unknown,
    args: { input: { reference: string } },
    ctx: any
  ) => {
    try { 
      const result = await getBookingListInBackOfficeByWeekService(args.input)
      return result
    }
    catch (error: any) {
      throw error
    }
  }

  export const GetBookingListInBackOfficeByWeek = {
    Query: {
      getBookingListInBackOfficeByWeek
    }
  }