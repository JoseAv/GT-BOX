import { Router } from "express";
import { controlLogin } from "../controls/controlLogin.js";
import type { typeLoginModel } from "../interfaces/login.js";


export const loginRouter = async ({ loginModel }: { loginModel: typeLoginModel }) => {

    const LoginRoutes = Router()
    const loginControl = new controlLogin({ loginModel })

    LoginRoutes.get('', await loginControl.login)
    LoginRoutes.get('/logout', await loginControl.logout)

    return LoginRoutes


}