import { hashPassword } from "../../shared/config/bcrypt/hashPassword.js"
import type { typeUser, userCreate, ValidationError } from "../interfaces/user.js"
import { validateCreateUser } from "./userSchema.js"



export class userValidation {

    static validateCreateUser = async ({ user }: { user: userCreate }): Promise<ValidationError> => {

        try {
            const { success, data } = await validateCreateUser({ user })

            if (!success)
                return [400, { message: 'Information not valid' }]

            const [status, ObjectPassword] = await hashPassword(data.password)
            if (status && +status >= 400)
                return [status, { message: 'Fallo en el password' }]

            const newUser: userCreate = { ...user, password: ObjectPassword.data as string }

            return [200, { message: 'Pass validation', data: newUser as typeUser }]

        } catch (error) {
            return [400, { message: String(error) }]
        }


    }


}