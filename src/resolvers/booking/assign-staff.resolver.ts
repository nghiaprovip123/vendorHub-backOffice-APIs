import { assignStaffByBookingRequestService } from "@/services/booking/assign-staff.service"
const assignStaffByBookingRequest = async (
    _: unknown,
    args: { input : any },
    ctx: any
) => {
    try {
        const result = await assignStaffByBookingRequestService(args.input)
        return {
            success: true,
            message: "Assign successfully a Staff",
            booking: result
        }    
    }
    catch (error: any) {
        throw error
    }
}

export const AssignStaffByBookingRequest = {
    Mutation: {
        assignStaffByBookingRequest
    }
}