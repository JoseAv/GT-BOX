import type { Request, Response } from "express";


export interface typeUserModel {
    createUser: ({ user }: { user: userCreate }) => sendInformation

}


export interface typeUserControler {
    ModelUser: typeUserModel
    createUser: (req: Request, res: Response) => Response
}

export type sendInformation = Array<number | string>


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
