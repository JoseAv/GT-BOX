import type { Request, Response } from "express";
import type { typeLoginModel } from "../interfaces/login.js";
import { config } from "../../shared/env/env.js";



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
        console.log(status)

        if (status >= 400)
            return res.status(status).json({ ...information })

        return res.cookie(config.loginCookie, 'information', {
            httpOnly: true,
            maxAge: 3600,
        }).status(200).json({ message: 'Exito en el inicio de sesion' })
    }


    logout = async (_: Request, res: Response): Promise<Response> => {
        res.clearCookie(config.loginCookie)
        return res.status(200).json({ message: 'Saliendo ...' })
    }

}