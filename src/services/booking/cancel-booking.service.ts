import { prisma } from "@/lib/prisma"

type cancelBookingSerivceType = {
    bookingId: string,
    cancelReason: string
}
export const cancelBookingSerivce = async( input: cancelBookingSerivceType ) => {
    if(!input.bookingId) {
        throw new Error("Missing Booking ID")
    }

    const checkBookingId = await prisma.booking.findFirst({
        where: {
            id: input.bookingId,
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
                cancelReason: input.cancelReason,
            }
        }
    )

    return cancelBooking
}
    