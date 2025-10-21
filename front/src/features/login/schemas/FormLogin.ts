import * as z from "zod"

export const formSchema = z.object({
    email: z
        .string(),
    password: z
        .string()
        .min(4, "You must type min 4 caracter")
})
