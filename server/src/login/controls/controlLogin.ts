import type { Request, Response } from "express";
import type { typeLoginModel } from "../interfaces/login.js";
import { config } from "../../shared/env/env.js";



export class controlLogin {
    controlModelLogin: typeLoginModel;

    constructor({ loginModel }: { loginModel: typeLoginModel }) {
        this.controlModelLogin = loginModel
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        // mandar al model
        // el modelo me regresa el jwt

        return res.cookie(config.loginCookie, 'information', {
            httpOnly: true,
            maxAge: 3600,
        }).send('cookie is set')
    }


    logout = async (req: Request, res: Response): Promise<Response> => {

        res.clearCookie(config.loginCookie)
        return res.status(200).json({ message: 'Saliendo ...' })


    }

}