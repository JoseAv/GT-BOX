import type { NextFunction, Response, Request } from "express";
import { signTokenAcces, VerifyToken } from "../../shared/config/jwt/JWT.js";
import { config } from "../../shared/env/env.js";
import type { saveJWt } from "../interfaces/login.js";
import { loginModel } from "../model/loginModel.js";
import { accesCookie } from "../../shared/cookie/refreshCookie.js";
import { usersCache } from "../../shared/cache/loginUser.js";

export const veryCooki = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // ? 1. Extraemos la cookie y objeto session
        const cookie = req.cookies[config.loginCookie]
        req.session = null
        if (!cookie) {
            await refreshToken(req, res)
            return next()
        }

        const verifyJwt = await VerifyToken({ jwt: cookie }) as saveJWt | null
        if (!verifyJwt) {
            await refreshToken(req, res)
            return next()
        }
        const UserCache = await ValidateCache({ verifyJwt })
        req.session = { ...UserCache }
        return next()
    } catch (error) {
        return next()

    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        // ? 1. Extraemos la cookie y objeto session`
        const cookie = req.cookies[config.relogin]
        req.session = null
        if (!cookie) {
            return false
        }

        // ? 2. verificamos que el token funcione
        const verifyJwt = await VerifyToken({ jwt: cookie }) as saveJWt | null
        if (!verifyJwt)
            return false

        const cache = await ValidateCache({ verifyJwt })
        if (!cache)
            return false
        //?3 Firmar Token
        const newJwt = await signTokenAcces({ user: cache })

        if (!newJwt)
            return false
        //?4. Refrescar cookie
        accesCookie(res, newJwt)

        req.session = cache
        return true
    } catch (error) {
        return false
    }
}


export const ValidateCache = async ({ verifyJwt }: { verifyJwt: saveJWt }) => {
    // ?3 buscamos en el cache y si no mandamos a buscar a la base da datos
    let cache = usersCache.searchUser({ user: verifyJwt })
    if (!cache) {
        const [_, information] = await loginModel.refreshUser({ userId: +verifyJwt.id })
        if (!information || !information.data) {
            return false
        }
        usersCache.saveUser({ user: information.data })
        cache = information.data
    }
    return cache

}