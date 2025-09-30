import type { NextFunction, Response, Request } from "express";
import { VerifyToken } from "../../shared/config/jwt/JWT.js";
import { config } from "../../shared/env/env.js";
import type { saveJWt } from "../interfaces/login.js";

export const veryCooki = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // ? 1. Extraemos la cookie y objeto session
        const cookie = req.cookies[config.loginCookie]
        req.session = null
        if (!cookie) {
            refreshToken(req)
            return next()
        }

        const verifyJwt = await VerifyToken({ jwt: cookie }) as saveJWt | null
        if (!verifyJwt) {
            refreshToken(req)
            return next()
        }

        req.session = { ...verifyJwt }
        console.log('Session de usuario', req.session)
        return next()
    } catch (error) {

        return res.status(400).json({ message: 'Error en servidor' })
    }
}

export const refreshToken = async (req: Request) => {

    try {
        // ? 1. Extraemos la cookie y objeto session
        const cookie = req.cookies[config.relogin]
        req.session = null
        if (!cookie)
            return

        const verifyJwt = await VerifyToken({ jwt: cookie }) as saveJWt | null
        if (!verifyJwt)
            return

        req.session = { verifyJwt }
        console.log('Session de usuario en el refresh', req.session)
        return
    } catch (error) {
        return
    }
}
