// resolvers/index.ts
// import { productResolver } from "./products.resolvers";
import { CreateStaff } from "./staffs/create-staff.resolver"
import { UpdateStaff } from "./staffs/update-staff.resolver"
import { DeleteStaff } from "./staffs/delete-staff.resolver"
import { ViewStaffList } from "./staffs/view-staff-list.resolver"
import { GetAvailableStaff } from "./staffs/get-available-staff.resolver"
import { CreateBookingByCustomer } from "./booking/create-booking.resolver"
export const resolvers = [
  // productResolver,
  CreateStaff,
  UpdateStaff,
  DeleteStaff,
  ViewStaffList,
  GetAvailableStaff,
  CreateBookingByCustomer
];
