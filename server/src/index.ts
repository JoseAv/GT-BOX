import express from "express"
import { config } from "./shared/env/env.js"
import { userRouter } from "./user/routes/user.routes.js"
import type { typeUserModel } from "./user/interfaces/user.js"
import { userModel } from "./user/models/userModel.js"
import cookieParser from 'cookie-parser'

const Main = async (userModel: typeUserModel) => {
    const app = express()
    app.use(express.json())
    app.use(cookieParser())
    app.use('/user', await userRouter(userModel))


    app.listen(config.port, () => console.log('Escuchando en:', config.port))
}


await Main(userModel)
