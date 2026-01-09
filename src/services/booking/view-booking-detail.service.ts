import { prisma } from "@/lib/prisma"

export const viewBookingDetailInBackOfficeService = async( bookingId: string ) => {
    if(!bookingId) {
        throw new Error("Missing Booking ID Information")
    }
    const viewBookingDetailInBackOffice = await prisma.booking.findFirst(
        {
            where: { id: bookingId }
        }
    )

    if(!viewBookingDetailInBackOffice) {
        throw new Error("Booking Detail doesn't not exist")
    }
    return viewBookingDetailInBackOffice
}
