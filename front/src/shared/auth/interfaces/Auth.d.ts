interface responseLogin {
    message: string;
    data?: authUser
}


export interface authUser {
    id: number
    first_name: string,
    email: string
    user_name: string
    password?: string
}

export interface sendInfoLogin {
    email: string,
    password: string
}