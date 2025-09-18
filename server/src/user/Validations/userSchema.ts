import * as z from "zod";
import type { userCreate } from "../interfaces/user.js";

const createUser = z.object({
    first_name: z.string().length(2),
    second_name: z.string().length(2).optional(),
    first_last_name: z.string().min(2),
    password: z.string().length(6),
    user_name: z.string().length(3),
    email: z.email(),
    date_of_birth: z.string().min(10),
    is_active: z.number().optional()
})

const validateCreateUser = (user: userCreate) => {
    return createUser.safeParse(user)
}
