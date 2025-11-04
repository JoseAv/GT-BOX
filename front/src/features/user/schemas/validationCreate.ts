import * as z from "zod"

export const createFormSchema = z.object({
    email: z
        .email(),
    password: z
        .string()
        .min(4, "You must type min 4"),
    first_name: z.string(),
    first_last_name: z.string(),
    second_name: z.string().min(3, "You must type min 3"),
    user_name: z.string().min(3, 'you must type min 3'),
    date_of_birth: z.date(),

}).refine((data) => {
    const birthDate = data.date_of_birth
    const today = new Date();
    let year = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        year = year - 1
    }
    return year < 18 ? false : true
}, { path: ['date_of_birth'], message: 'From date must be before to date' })

export const updateSchema = createFormSchema.partial()