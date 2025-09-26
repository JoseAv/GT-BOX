import type { promise } from "zod"

export interface typeLoginControler {
    controlModelLogin: typeLoginModel
    login: (req: Request, res: Response) => Promise<Response>

}

export interface loginUser {
    email: string,
    password: string
}


export interface typeLoginModel {
    login: ({ user }: { user: loginUser }) => Promise<ValidationError>

}



export interface typeLogin {
    email: string
    password: string
}

interface responseLogin {
    message: string;
    data?: typeLogin

}
export type ValidationLogin = [number, responseLogin] // Para errores