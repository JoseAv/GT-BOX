import bcrypt from 'bcrypt'
import { config } from '../../env/env.js'

export const hashPassword = async (password: string) => {
    try {
        const hashPassword = await bcrypt.hash(password, config.salt)
        return [200, hashPassword]
    } catch (ex) {
        return [400, ex]
    }
}

export const comparePassword = async (password: string, hashPassword: string) => {
    try {
        const comparePassword = await bcrypt.compare(password, hashPassword)
        return [200, comparePassword]
    } catch (ex) {
        return [400, ex]
    }
}