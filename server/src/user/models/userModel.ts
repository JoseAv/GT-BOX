import type { userCreate, ValidationError } from "../interfaces/user.js";
import { userValidation } from "../Validations/userValidations.js";


export class userModel {

    static createUser = async ({ user }: { user: userCreate }): Promise<ValidationError> => {
        const [valid, data] = await userValidation.validateCreateUser({ user })

        if (valid >= 400)
            return [+valid, { message: data.message }]




        return [2343, { message: 'Create User Success' }]

    }




}