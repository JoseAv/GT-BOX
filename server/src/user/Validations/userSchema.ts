import * as z from "zod";
import type { typeUser, userCreate } from "../interfaces/user.js";

const createUser = z.object({
    first_name: z.string().min(2),
    second_name: z.string().min(2).optional(),
    first_last_name: z.string().min(2),
    password: z.string().min(6),
    user_name: z.string().min(3),
    email: z.string().min(10),
    date_of_birth: z.string().min(10),
    is_active: z.boolean().optional()
})

const updateUser = createUser.partial().extend({
    id: z.number()
})

export const validateCreateUser = async ({ user }: { user: userCreate }) => {
    return createUser.safeParse(user)
}

export const validateUpdateUser = async ({ user }: { user: typeUser }) => {
    return updateUser.safeParse(user)
}

