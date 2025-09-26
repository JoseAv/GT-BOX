import type { loginUser } from "../interfaces/login.js";
import { Validationlogin } from "../validations/loginValidation.js";

export class loginModel {


    static async login({ user }: { user: loginUser }) {
        try {
            return await Validationlogin({ user })
        } catch (error) {
            return [400, String(error)]
        }

    }



}