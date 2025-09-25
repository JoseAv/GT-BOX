import { SignJWT, jwtVerify } from "jose";
import { config } from "../../env/env.js";


export const signToken = async ({ user }: { user: number }) => {
    try {

        return await new SignJWT({ user, loginTime: Date.now() })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(config.secret)

    } catch (error) {
        return String(error)
    }


}

export const VerifyToken = async ({ jwt }: { jwt: string }) => {
    try {
        const { payload, protectedHeader } = await jwtVerify(jwt, config.secret)
        return payload
    } catch (error) {
        return String(error)
    }

}

export const tokenDate = async (jwtDate: number) => {
    const verify = (Date.now() - jwtDate) / (1000 * 60 * 60)
    return verify < 7 ? true : false
}