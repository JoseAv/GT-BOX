export interface ResponseServer {
    success: boolean
    message: string
    http_code: number
    time: string
    data: Record<string, user>
}

export interface user {
    id: number
    first_name: string
    second_name: string
    user_name: string
    email: string
    date_of_birth: string
    is_active: boolean
}

