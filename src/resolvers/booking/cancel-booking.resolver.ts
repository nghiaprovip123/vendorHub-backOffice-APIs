import { prisma } from "@/lib/prisma"
const cancelBooking = async(
    _: unknown,
    args: { input: any },
    ctx: any
) => {
    try {
        if(!args.input.bookingId) {
            throw new Error("Missing Booking ID")
        }
    
        const checkBookingId = await prisma.booking.findFirst({
            where: {
              id: args.input.bookingId,
              status: {
                in: [
                  "Đã xếp lịch",
                  "Chờ xếp lịch",
                  "Sắp diễn ra",
                  "Đang diễn ra"
                ]
              }
            }
          });
          
    
        if(!checkBookingId) {
            throw new Error("Booking ID doesn't exist or can't be cancelled")
        }
    
        const cancelBooking = await prisma.booking.update(
            {
                where: { id: checkBookingId.id },
                data: {
                    status: "Đã huỷ",
                    cancelReason: args.input.cancelReason,
                }
            }
        )
    
        return {
            success: true,
            message: "Successfully cancel Booking",
            booking: cancelBooking
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