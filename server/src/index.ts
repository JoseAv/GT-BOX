import express from "express"
import { config } from "./shared/env/env.js"
import { userRouter } from "./user/routes/user.routes.js"
import { loginRouter } from "./login/routes/login.routes.js"
import { Models, type IModel } from './shared/config/models/unionModel.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { veryCooki } from "./login/middleware/verifyCookie.js"
import { standarRouter } from "./products/standart/routes/standart.routes.js"

const Main = async (Models: IModel) => {
    const app = express()
    app.use(express.json())
    app.use(cookieParser())
    app.use(veryCooki)
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,

    }));
    app.use('/user', await userRouter(Models.userModel))
    app.use('/login', await loginRouter({ loginModel: Models.loginModel }))
    app.use('/products', await standarRouter({ ProductsModel: Models.ProductsModel }))

    app.listen(config.port, () => console.log('Escuchando en:', config.port))
}


await Main(Models)
