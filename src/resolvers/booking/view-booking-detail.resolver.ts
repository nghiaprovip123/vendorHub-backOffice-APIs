import { viewBookingDetailInBackOfficeService } from "@/services/booking/view-booking-detail.service"
const viewBookingDetailInBackOffice = async(
    _: unknown,
    args: { input: any },
    ctx: any
) => {
    try {
        const result = await viewBookingDetailInBackOfficeService(args.input.bookingId)
        return result
    }
    catch(error: any) {
        throw error
    }            
}
export const ViewBookingDetailInBackOffce = {
    Query: {
        viewBookingDetailInBackOffice
    }
}