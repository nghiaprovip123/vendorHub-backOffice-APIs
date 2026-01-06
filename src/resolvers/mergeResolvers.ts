// resolvers/index.ts
import { productResolver } from "./products.resolvers";
import { CreateStaff } from "./staffs/create-staff.resolver"

export const resolvers = [
  productResolver,
  CreateStaff
];
