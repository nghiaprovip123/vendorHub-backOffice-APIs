import {z} from "zod"

export const SendOTPSchema = z.object(
    {
        type: z.string(),
        phone: z.string(),
        email: z.email()
    }
)