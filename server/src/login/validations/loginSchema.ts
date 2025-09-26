import z, { email, safeParse, string } from 'zod'
import type { loginUser } from '../interfaces/login.js'


const LoginUser = z.object({
    email: email(),
    password: string().min(6)
})


export const SchemaLoginUser = async ({ user }: { user: loginUser }) => {
    return LoginUser.safeParse(user)
}