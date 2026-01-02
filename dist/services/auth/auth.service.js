"use strict";
// import { StatusCodes } from "http-status-codes";
// import bcrypt from "bcryptjs";
// import { UserModel } from "@/models/user.model";
// import ApiError from "@/utils/ApiError";
// import jwt, { JwtPayload } from "jsonwebtoken"
// interface RegisterInput {
//     email: string;
//     password: string;
//     userName?: string;
// }
// interface LoginInput {
//     email: string;
//     password: string;
// }
// export const authService = {
//     register: async ({ email, password, userName }: RegisterInput) => {
//         const existingUser = await UserModel.findByEmail(email);
//         if (existingUser) {
//             throw new ApiError(
//                 StatusCodes.CONFLICT,
//                 "Email already registered"
//             );
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await UserModel.create({
//             email,
//             password: hashedPassword,
//             userName: userName ?? email
//         });
//         return { message: "Account created successfully" };
//     },
//     login: async ({ email, password }: LoginInput) => {
//         const existingUser = await UserModel.findByEmail(email);
//         if (!existingUser) {
//             throw new ApiError(StatusCodes.UNAUTHORIZED, "USER_NOT_FOUND");
//         }
//         const match = await bcrypt.compare(password, existingUser.password);
//         if (!match) {
//             throw new ApiError(StatusCodes.BAD_REQUEST, "Wrong password")
//         }
//         const accessToken = await jwt.sign(
//             { id: existingUser.id },
//             process.env.JWT_SECRET!,
//             { expiresIn: "15m" }
//         )
//         const refreshToken = await jwt.sign(
//             { id: existingUser.id },
//             process.env.JWT_SECRET!,
//             { expiresIn: "7d" }
//         )
//         return { accessToken, refreshToken }
//     },
//     refreshToken: async (token: string) => {
//         if (!token) throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized - No token")
//         let decoded: JwtPayload
//         try {
//             decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
//         } catch (err)
//         {
//         }
//     }
// };
