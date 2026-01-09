import { prisma } from "@/lib/prisma"

type assignStaffByBookingRequestServiceType = {
    bookingId: string, 
    staffId: string
}
export const assignStaffByBookingRequestService = async(input: assignStaffByBookingRequestServiceType) => {
    if (!input.bookingId) {
        throw new Error("Missing Booking ID!")
    }

    const findBookingInformation = await prisma.booking.findFirst(
        {
            where: { id: input.bookingId,
                status: "Chờ xếp lịch"
                }
        }
    )

    if (!findBookingInformation) {
        throw new Error("The Booking doesn't available for Staff Assignment!")
    }

    const assignBookingInformation = await prisma.booking.update(
        {
            where: { id: findBookingInformation.id },
            data: { 
                staffId: input.staffId,
                status: "Đã xếp lịch"
                }
        }
    )

    return assignBookingInformation
}
