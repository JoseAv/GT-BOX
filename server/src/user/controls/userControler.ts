import type { Request, Response } from "express";
import type { typeUserControler, typeUserModel } from "../interfaces/user.js";


export class userControler implements typeUserControler {
    ModelUser: typeUserModel

    constructor(userModel: typeUserModel) {
        this.ModelUser = userModel
    }


    createUser = async (req: Request, res: Response): Promise<Response> => {
        const user = req.body
        const [status, data] = await this.ModelUser.createUserModel({ user })
        return res.status(status).json({ ...data })

    }

    getAllUser = async (req: Request, res: Response): Promise<Response> => {
        const [status, data] = await this.ModelUser.getAllUser()
        return res.status(status).json({ ...data })
    }


}