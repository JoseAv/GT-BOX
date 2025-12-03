import type { typeAttributeModel } from "../../../attribute/interfaces/model.js"
import { AttributeModel } from "../../../attribute/model/attributeModel.js"
import type { typeLoginModel } from "../../../login/interfaces/login.js"
import { loginModel } from "../../../login/model/loginModel.js"
import type { typeProductModel } from "../../../products/standart/interfaces/model.js"
import { ProductsModel } from "../../../products/standart/model/ProducModel.js"
import type { typeUserModel } from "../../../user/interfaces/user.js"
import { userModel } from "../../../user/models/userModel.js"

export interface IModel {
    userModel: typeUserModel,
    loginModel: typeLoginModel
    ProductsModel: typeProductModel
    AttributeModel: typeAttributeModel
}

export const Models: IModel = {
    userModel,
    loginModel,
    ProductsModel,
    AttributeModel
}