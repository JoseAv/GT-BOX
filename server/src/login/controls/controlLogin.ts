import type { Request, Response } from "express";
import type { typeLoginModel } from "../interfaces/login.js";
import { config } from "../../shared/env/env.js";
import { usersCache } from "../../shared/cache/loginUser.js";
import { accesCookie, RefreshCookie } from "../../shared/cookie/refreshCookie.js";



export class controlLogin {
    controlModelLogin: typeLoginModel;

    constructor({ loginModel }: { loginModel: typeLoginModel }) {
        this.controlModelLogin = loginModel
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        //? 1. Extraer req.body
        const user = req.body

        //? 2. Mandar la informacion al modelo
        const [status, information] = await this.controlModelLogin.login({ user })
        if (status >= 400)
            return res.status(status).json({ ...information })


        //? 4. Guardamos la cookie
        accesCookie(res, information)
        RefreshCookie(res, information)
        return res.status(200).json({ message: 'Exito en el inicio de sesion' })
    }


    logout = async (_: Request, res: Response): Promise<Response> => {
        res.clearCookie(config.loginCookie)
        return res.status(200).json({ message: 'Saliendo ...' })
    }

}