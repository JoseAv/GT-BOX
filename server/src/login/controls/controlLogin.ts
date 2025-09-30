import type { Request, Response } from "express";
import type { typeLoginModel } from "../interfaces/login.js";
import { config } from "../../shared/env/env.js";
import { accesCookie, RefreshCookie } from "../../shared/cookie/refreshCookie.js";
import { signTokenAcces, signTokenRefresh } from "../../shared/config/jwt/JWT.js";



export class controlLogin {
    controlModelLogin: typeLoginModel;

    constructor({ loginModel }: { loginModel: typeLoginModel }) {
        this.controlModelLogin = loginModel
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        //? 1. Extraer req.body
        const user = req.body
        try {
            //? 2. Mandar la informacion al modelo
            const [status, userWithoutPassword] = await this.controlModelLogin.login({ user })
            if (status >= 400)
                return res.status(status).json({ ...userWithoutPassword })

            //? 4. Guardamos la cookie
            //? 4.1 Creamos el jwt
            const jwtAcces = await signTokenAcces({ user: userWithoutPassword })
            const jwtRefresh = await signTokenRefresh({ userId: userWithoutPassword.id })
            //? 4.2 Guardamos las cookies
            if (!jwtAcces || !jwtRefresh) {
                return res.status(400).json({ message: 'Error al iniciar sesion' })
            }
            accesCookie(res, jwtAcces)
            RefreshCookie(res, jwtRefresh)
            return res.status(200).json({ message: 'Exito en el inicio de sesion' })

        } catch (error) {
            return res.status(400).json({ message: 'Error al iniciar sesion' })

        }
    }


    logout = async (_: Request, res: Response): Promise<Response> => {
        res.clearCookie(config.loginCookie)
        return res.status(200).json({ message: 'Saliendo ...' })
    }

}