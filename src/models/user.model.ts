import { prisma } from '@/lib/prisma'
export const UserModel = {
    findByEmail: (email: string) => {
        return prisma.user.findUnique({
            where: { email }
        });
    },

    create: (data: {
        email: string;
        password: string;
        userName: string;
    }) => {
        return prisma.user.create({ data });
    }
};