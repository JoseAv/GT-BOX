import { Router } from "express"
import { userControler } from "../controls/userControler.js"
import type { typeUserModel } from "../interfaces/user.js"


export const userRouter = async (userModel: typeUserModel) => {
    const userRouter = Router()
    const controler = new userControler(userModel as typeUserModel)
    userRouter.post('/create', await controler.createUser)
    userRouter.get('/all', await controler.getAllUser)



    return userRouter
}