import { prisma } from "@/lib/prisma"
const assignStaffByBookingRequest = async (
    _: unknown,
    args: { input : any },
    ctx: any
) => {
    try {
        const findBookingInformation = await prisma.booking.findFirst(
            {
                where: { id: args.input.bookingId, 
                    status: "Chờ xếp lịch"
                 }
            }
        )
        if(!findBookingInformation?.id) {
            throw new Error("The booking isn't available for staff assignment")
        }
    
        const assignBookingInformation = await prisma.booking.update(
            {
                where: { id: args.input.bookingId },
                data: {
                    staffId: args.input.staffId,
                    status: "Đã xếp lịch"
                }
            }
        )
        return {
            success: true,
            message: "Assign successfully a Staff",
            booking: assignBookingInformation
        }
    }
    catch (error: any) {
        throw new Error("Unknown Error")
    }
}

export const AssignStaffByBookingRequest = {
    Mutation: {
        assignStaffByBookingRequest
    }
}