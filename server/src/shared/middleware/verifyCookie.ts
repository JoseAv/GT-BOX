import type { NextFunction, Response, Request } from "express";
import { tokenDate, VerifyToken } from "../config/jwt/JWT.js";
import { config } from "../env/env.js";
import type { saveJWtWithDate } from "../../login/interfaces/login.js";

export const veryCooki = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // ? 1. Extraemos la cookie y objeto session
        const cookie = req.cookies[config.loginCookie]
        req.session = null
        if (cookie) {
            // ? 2. mandamos a verificar la jwt
            const verifyJwt = await VerifyToken({ jwt: cookie }) as saveJWtWithDate | string
            if (typeof verifyJwt === 'string') {
                return next()
            }

            // ? 3. mandamos a validar la fecha
            const verifyDate = await tokenDate(verifyJwt.loginTime)
            if (!verifyDate) {
                return next()
            }

            // ? 4 refrescamos el token
            // const refresToken = await

            // ? 5 mandamos informacion

            req.session = { ...verifyJwt }
            console.log('Session de usuario', req.session)

            return next()

        }

        next()

    } catch (error) {

        return res.status(400).json({ message: 'Error en servidor' })
    }




}

