import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type registerType = {
    email: string,
    password: string,
    userName?: string,
}

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
 