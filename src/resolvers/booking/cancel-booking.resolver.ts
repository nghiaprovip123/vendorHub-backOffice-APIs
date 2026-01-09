import { cancelBookingSerivce } from "@/services/booking/cancel-booking.service"
const cancelBooking = async(
    _: unknown,
    args: { input: any },
    ctx: any
) => {
    try {
        const result = await cancelBookingSerivce(args.input)
        return {
            success: true,
            message: "Successfully cancel Booking",
            booking: result
        }    
    }
    catch (error:any) {
        throw error
    }
}
export const CancelBooking = {
    Mutation: {
        cancelBooking
    }
}