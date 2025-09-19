import type { userCreate, sendInformation } from "../interfaces/user.js";
import { userValidation } from "../Validations/userValidations.js";


export class userModel {

    static createUser = ({ user }: { user: userCreate }): sendInformation => {
        const [status, data] = userValidation.validateCreateUser({ user })

        return [2343, 'hola']

    }




}