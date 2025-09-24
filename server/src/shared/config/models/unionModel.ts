import type { typeLoginModel } from "../../../login/interfaces/login.js"
import { loginModel } from "../../../login/model/loginModel.js"
import type { typeUserModel } from "../../../user/interfaces/user.js"
import { userModel } from "../../../user/models/userModel.js"

export interface IModel {
    userModel: typeUserModel,
    loginModel: typeLoginModel
}

export const Models: IModel = {
    userModel,
    loginModel

}