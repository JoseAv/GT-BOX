import bcrypt from 'bcrypt'
import { config } from '../../shared/env/env.js'
import type { ValidationError } from '../../user/interfaces/user.js'

export const hashPassword = async (password: string): Promise<ValidationError> => {
    try {
        const hashPassword = await bcrypt.hash(password, config.salt)
        return [200, { message: 'Completed', data: hashPassword }]
    } catch (ex) {
        return [400, { message: String(ex) }]
    }
}

export const comparePassword = async (password: string, hashPassword: string): Promise<ValidationError> => {
    try {
        const comparePassword = await bcrypt.compare(password, hashPassword)
        return [200, { message: 'Completed', data: comparePassword }]
    } catch (ex) {
        return [400, { message: String(ex) }]

    }
}