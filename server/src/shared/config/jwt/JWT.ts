import { SignJWT, jwtVerify } from "jose";
import { config } from "../../env/env.js";


export const signToken = async ({ user }: { user: number }) => {
    return await new SignJWT({ user })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(config.secret)
}

export const VerifyToken = async ({ jwt }: { jwt: string }) => {
    const { payload, protectedHeader } = await jwtVerify(jwt, config.secret)

    console.log('Information', payload)

}