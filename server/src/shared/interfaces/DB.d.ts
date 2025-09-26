import type { record, string } from "zod"

export interface responseSuccessDB {
    success: string
    message: string
    http_code: number
    time: string
}

export interface GenericSpResponse {
    [key: string]: responseSuccessDB
}

export interface ResultDB {
    result: responseSuccessDB
}

export interface typeJwt {
    user: id,
    loginTime: number
}



// Extendemos Request

declare global {
    namespace Express {
        interface Request {
            session?: SessionData | null;
        }
    }
}