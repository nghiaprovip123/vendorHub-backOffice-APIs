import { prisma } from "@/lib/prisma"
import { createBookingByCustomerService } from "@/services/booking/create-booking.service"
const createBookingByCustomer = async(
    _: unknown,
    args: { input: any },
    ctx: any
) => {
    try {
        const result = await createBookingByCustomerService(args.input)
        return result
    }
    catch(error: any) {
        throw new Error("Fail to create new Booking by Customer")
    } 
}

export const CreateBookingByCustomer = {
    Mutation: {
        createBookingByCustomer
    }
}