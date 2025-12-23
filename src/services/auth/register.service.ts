import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
import * as z from 'zod'
import { authSchema } from '@/validation/auth/auth.validation'

type registerType = z.infer<typeof authSchema.register>;

export const register = async ({ email, password, userName }: registerType) => {
    const checkUser = await prisma.user.findUnique(
        {
            where: {email}
        }
    );

    if (checkUser) {
        throw new Error("User already exists");
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create(
        {
            data: {
                email,
                userName: userName ?? email,
                password: hashPassword,
            }
        }
    )

    return createUser;
}

export default register; 