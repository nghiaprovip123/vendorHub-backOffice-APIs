import { getAvailableStaffbyBookingTimeService } from "@/services/staffs/get-available-staff.service"

const getAvailableStaffByBookingTime = async (
  _: unknown,
  args: { input: any },
  ctx: any
) => {
  try { 
     const result = await getAvailableStaffbyBookingTimeService(args.input);
     return result
   }
   catch (error: any) {
    throw error
   }
}

export const GetAvailableStaff = {
  Query: {
    getAvailableStaffByBookingTime,
  },
};
