import { prisma } from "@/lib/prisma";

const getAvailableStaffByBookingTime = async (
  _: unknown,
  args: { input: any },
  ctx: any
) => {
  const { dayOfWeek, startTime, endTime } = args.input;

  const workingHours = await prisma.workingHour.findMany({
    where: {
      day: dayOfWeek,
      startTime: { lte: startTime },
      endTime: { gte: endTime },
    },
    select: {
      staffId: true,
    },
  });

  const staffIds = workingHours.map(w => w.staffId);

  if (staffIds.length === 0) return [];

  const staffs = await prisma.staff.findMany({
    where: {
      id: { in: staffIds },
      isDeleted: false,
    },
  });

  return staffs;
};

export const GetAvailableStaff = {
  Query: {
    getAvailableStaffByBookingTime,
  },
};
