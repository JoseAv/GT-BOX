import type { Response } from "express"
import { config } from "../env/env.js"

export const RefreshCookie = async (res: Response, jwt: string) => {

    res.cookie(config.relogin, jwt, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    })

}

export const accesCookie = async (res: Response, jwt: string) => {

    res.cookie(config.loginCookie, jwt, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    })

}