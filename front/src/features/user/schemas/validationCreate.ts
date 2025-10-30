import * as z from "zod"

export const formSchema = z.object({
    email: z
        .email(),
    password: z
        .string()
        .min(4, "You must type min 4"),
    second_name: z.string().min(3, "You must type min 3"),
    user_name: z.string().min(3, 'you must type min 3'),
    date_of_birth: z.date(),

}).refine((data) => {
    const birthDate = new Date(data.date_of_birth);
    const today = new Date();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return false
    }
    return true
}, { path: ['date_of_birth'], message: 'From date must be before to date' })