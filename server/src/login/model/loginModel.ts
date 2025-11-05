import type { loginUser, ValidationLogin } from "../interfaces/login.js";
import { Validationlogin } from "../validations/loginValidation.js";
import { RepoLogin } from "../repositories/loginRepo.js";

export class loginModel {
    static async login({ user }: { user: loginUser }) {
        try {
            return await Validationlogin({ user })
        } catch (error) {
            return [400, String(error)]
        }

    }

    static async refreshUser({ userId }: { userId: number }): Promise<ValidationLogin> {
        try {
            return await RepoLogin.refreshUser({ userId })
        } catch (error) {
            return [400, { message: 'Error en Db' }]
        }

    }



}