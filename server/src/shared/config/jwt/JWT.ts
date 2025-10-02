import { SignJWT, jwtVerify } from "jose";
import { config } from "../../env/env.js";
import type { saveJWt } from "../../../login/interfaces/login.js";


export const signTokenAcces = async ({ user }: { user: saveJWt }) => {
    try {
        return await new SignJWT({ ...user })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('30s')
            .sign(config.secret)
    } catch (error) {
        console.log(error)
        return null
    }
}

export const signTokenRefresh = async ({ userId }: { userId: number }) => {
    try {
        return await new SignJWT({ id: userId })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(config.secret)
    } catch (error) {
        console.log(error)
        return null
    }
}


export const VerifyToken = async ({ jwt }: { jwt: string }) => {
    try {
        const { payload, protectedHeader } = await jwtVerify(jwt, config.secret)
        return payload

    } catch (error) {
        console.log('Fecha no valida')
        return null
    }

}

