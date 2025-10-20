import * as z from "zod"

export const formSchema = z.object({
    email: z
        .email(),
    password: z
        .string()
        .min(4, "You must type min 4 caracter")
})
