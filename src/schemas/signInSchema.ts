import {email, z} from "zod"

export const sifnInSchema = z.object({
    email: z.string(),
    password: z.string(),
})