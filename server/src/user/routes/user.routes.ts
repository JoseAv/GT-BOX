import { Router } from "express"
import { userControler } from "../controls/userControler.js"
import type { typeUserModel } from "../interfaces/user.js"


export const userRouter = (userModel: typeUserModel) => {
    const userRouter = Router()
    const controler = new userControler(userModel)
    userRouter.post('/create', controler.createUser)

    return userRouter
}