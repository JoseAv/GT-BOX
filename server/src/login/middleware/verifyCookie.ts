import type { NextFunction, Response, Request } from "express";
import { VerifyToken } from "../../shared/config/jwt/JWT.js";
import { config } from "../../shared/env/env.js";
import type { saveJWt } from "../interfaces/login.js";
import { loginModel } from "../model/loginModel.js";

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
        return next()
    } catch (error) {
        return next()

    }
}

export const refreshToken = async (req: Request) => {

    try {
        // ? 1. Extraemos la cookie y objeto session`
        const cookie = req.cookies[config.relogin]
        req.session = null
        if (!cookie)
            return
        // ? 2. verificamos que el token funcione
        const verifyJwt = await VerifyToken({ jwt: cookie }) as saveJWt | null
        if (!verifyJwt)
            return
        const refreshUser = await loginModel.refreshUser({ userId: +verifyJwt.id })
        // req.session = { verifyJwt }
        return
    } catch (error) {
        return
    }
}
