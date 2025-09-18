import express from "express"
import { config } from "./env/env.js"
import { userRouter } from "./user/routes/user.routes.js"
import type { typeUserModel } from "./user/interfaces/user.js"
import { userModel } from "./user/models/userModel.js"



const Main = (userModel: typeUserModel) => {
    const app = express()
    app.use(express.json())

    app.use('/user', userRouter(userModel))



    app.listen(config.port, () => console.log('Escuchando en:', config.port))
}


Main(userModel)
