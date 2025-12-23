import * as z from "zod";

export const authSchema = {
    register: z.object({
        email: z.email(),
        password: z.string().min(8),
        userName: z.string().optional()
    }),
    login: z.object({
        email: z.email(),
        password: z.string().min(8),
    })
};