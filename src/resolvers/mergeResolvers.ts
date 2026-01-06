// resolvers/index.ts
import { productResolver } from "./products.resolvers";
import { CreateStaffResolver } from "./staffs/create-staff.resolver"

export const resolvers = [
  productResolver,
  CreateStaffResolver
];
