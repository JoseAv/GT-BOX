import { hashPassword } from "../../shared/config/bcrypt/hashPassword.js"
import type { typeUser, userCreate, ValidationError } from "../interfaces/user.js"
import { validateCreateUser, validateUpdateUser } from "./userSchema.js"



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

    static validateUpdateUser = async ({ user }: { user: typeUser }): Promise<ValidationError> => {

        try {
            const { success, data } = await validateUpdateUser({ user })

            if (!success)
                return [400, { message: 'Information not valid' }]

            let updateUser: typeUser = { ...user }
            if (data.password) {
                const [status, ObjectPassword] = await hashPassword(data.password)
                updateUser = { ...user, password: ObjectPassword.data as string }

                if (status && +status >= 400)
                    return [status, { message: 'Fallo en el password' }]
            }

            return [200, { message: 'Pass validation', data: updateUser as typeUser }]

        } catch (error) {
            return [400, { message: String(error) }]
        }


    }



}