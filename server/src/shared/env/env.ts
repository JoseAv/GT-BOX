interface typesCongig {
    port: number,
    username: string,
    password: string,
    salt: number,
    secret: Uint8Array<ArrayBuffer>
}


process.loadEnvFile()

export const config: typesCongig = {
    port: Number(process.env.PORT) || 3000,
    username: String(process.env.USERNAME_DB),
    password: String(process.env.PASSWORD_DB),
    salt: Number(process.env.SALT) || 10,
    secret: new TextEncoder().encode(process.env.SECRET)
} as const