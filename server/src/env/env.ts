interface typesCongig {
    port: number
}

export const config: typesCongig = {
    port: Number(process.env.PORT) || 3000

} as const