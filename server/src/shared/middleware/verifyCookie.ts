import type { NextFunction, Response, Request } from "express";
import { tokenDate, VerifyToken } from "../config/jwt/JWT.js";
import { config } from "../env/env.js";

export const veryCooki = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // ? 1. Extraemos la cookie y objeto session
        const cookie = req.cookies[config.loginCookie]
        console.log(cookie)
        if (cookie) {
            req.session = null
            console.log(cookie)
            // ? 2. mandamos a verificar la jwt
            const verifyJwt = await VerifyToken({ jwt: cookie })
            // ? 3. mandamos a validar la fecha
            const verifyDate = await tokenDate(verifyJwt.loginTime)
            console.log(verifyDate)
            //? 4 depende de la fecha llenamos el req.session

            //? 5 salimos de la funcion
            next()


        }
        next()


        // 
        // validamos fecha
        // volvemos a crear cookie si aun es valido



    } catch (error) {

        return res.status(400).json({ message: 'Error en servidor' })
    }




}

