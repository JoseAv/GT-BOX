import type { Request, Response } from "express";


export interface typeUserModel {
    createUserModel: ({ user }: { user: userCreate }) => Promise<ValidationError>
    getAllUser: () => Promise<ValidationError>
    updateUser: ({ user }: { user: typeUser }) => Promise<ValidationError>
}

export interface typeUserControler {
    ModelUser: typeUserModel
    createUser: (req: Request, res: Response) => Promise<Response>
    getAllUser: (req: Request, res: Response) => Promise<Response>
    updateUser: (req: Request, res: Response) => Promise<Response>
}



export interface typeUser {
    id: number,
    first_name: string,
    second_name: string | null
    first_last_name: string
    password: string
    user_name: string
    email: string
    date_of_birth: string
    create_date: string
    is_active: string | null
}

export type userCreate = Omit<typeUser, 'id' | 'create_date'>


interface responseObjectUser {
    message: string
    data?: userCreate | string | boolean

}
export type ValidationError = [number, responseObjectUser] // Para errores
