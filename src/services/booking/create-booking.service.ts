import { prisma } from "@/lib/prisma"
import * as z from "zod"
import { CreateBookingByCustomerSchema } from "@/validation/booking/booking.validation"

type createBookingByCustomerServiceType = z.infer< typeof CreateBookingByCustomerSchema >
export const createBookingByCustomerService = async( input: createBookingByCustomerServiceType ) => {
    const {
        serviceId,
        staffId,  
        day,
        dayOfWeek,
        startTime,
        endTime,
        customerName,
        customerPhone,
        customerEmail,
        notes,
    } = input

    if (!serviceId) {
        throw new Error("Missing Service Information")
    }

    const checkStaffID = Boolean(staffId);
    const processStatus = checkStaffID ? "Đã đặt lịch" : "Chờ xác nhận";

    const createBookingByCustomerService = await prisma.booking.create(
        {
            data: {
                serviceId: serviceId,
                staffId: staffId,  
                day: day,
                dayOfWeek: dayOfWeek,
                startTime: startTime,
                endTime: endTime,
                customerName: customerName,
                customerPhone: customerPhone,
                customerEmail: customerEmail,
                notes: notes,
                status: processStatus
            }
        }
    )
    return createBookingByCustomerService
}