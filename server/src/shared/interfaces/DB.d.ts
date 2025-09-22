import type { record, string } from "zod"

export interface responseSuccessDB {
    success: string
    message: string
    http_code: number
    time: string
    data?: string
}

export interface GenericSpResponse {
    [key: string]: responseSuccessDB
}