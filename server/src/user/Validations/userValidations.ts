import type { sendInformation, userCreate } from "../interfaces/user.js"
import { validateCreateUser } from "./userSchema.js"



export class userValidation {

    static validateCreateUser = ({ user }: { user: userCreate }): sendInformation => {

        try {
            const validateData = validateCreateUser({ user })
            console.log(validateData)
            return [200, 'yes']

        } catch (error) {
            return [200, String(error)]

        }


    }


}