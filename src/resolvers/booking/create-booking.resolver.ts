import { prisma } from "@/lib/prisma"
const createBookingByCustomer = async(
    _: unknown,
    args: { input: any },
    ctx: any
) => {
    try {
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
            notes
        } = args.input
    
        if (!serviceId) {
            throw new Error("Missing Service information.")
        }

        const hasStaff = Boolean(staffId)

        const processedStatus = hasStaff ? "Đã đặt lịch" : "Chờ xếp lịch"
    
        const createBookingByCustomer = await prisma.booking.create(
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
                    status: processedStatus
                }
            }
        )
        console.log(createBookingByCustomer)
        return createBookingByCustomer
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