import type { typeUser, userCreate, ValidationError } from "../interfaces/user.js";
import { userRepo } from "../repositories/userRepo.js";
import { userValidation } from "../Validations/userValidations.js";


export class userModel {

    static createUserModel = async ({ user }: { user: userCreate }): Promise<ValidationError> => {
        const [valid, successUser] = await userValidation.validateCreateUser({ user })

        if (valid >= 400)
            return [+valid, { message: successUser.message }]

        return await userRepo.dbCreateUser({ user: successUser.data as userCreate })
    }




}