import { prisma } from "@/lib/prisma"
import * as z from "zod"
import { createWorkingHourSchema } from "@/validation/staffs/staffs.validation"

type getAvailableStaffbyBookingTimeType = z.infer< typeof createWorkingHourSchema > 
export const getAvailableStaffbyBookingTimeService = async(input: getAvailableStaffbyBookingTimeType) => {
    try {
        console.log(input);
        const {
            day,
            startTime,
            endTime
        } = input
        
        const getAcceptableWorkingHourbyBookingTime = await prisma.workingHour.findMany(
            {
                where: {
                    day: day,
                    startTime: { lte: startTime },
                    endTime: { gte: endTime }
                },
                select: {
                    staffId: true
                }
            }
        )
        
        const createStaffIdsArray = getAcceptableWorkingHourbyBookingTime.map((w) => w.staffId)
    
        if(createStaffIdsArray.length === 0) {
            return []
        }
    
        const staff = await Promise.all(
            createStaffIdsArray.map((staffs) => {
                const findStaff = prisma.staff.findFirst(
                    {
                        where: {
                            id: staffs, 
                            isDeleted: false,
                        }
                    }
                )
                return findStaff
            })
        )
    
        return staff
    }
    catch(error) {
        throw new Error("Fail to Get Available Staff")
    }
}