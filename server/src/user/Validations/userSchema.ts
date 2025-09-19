import * as z from "zod";
import type { userCreate } from "../interfaces/user.js";

const createUser = z.object({
    first_name: z.string().min(2),
    second_name: z.string().min(2).optional(),
    first_last_name: z.string().min(2),
    password: z.string().min(6),
    user_name: z.string().min(3),
    email: z.string().min(10),
    date_of_birth: z.string().min(10),
    is_active: z.number().optional()
})

export const validateCreateUser = ({ user }: { user: userCreate }) => {
    return createUser.safeParse(user)
}
