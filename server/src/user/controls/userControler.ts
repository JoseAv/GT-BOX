import type { Request, Response } from "express";
import type { typeUserControler, typeUserModel } from "../interfaces/user.js";


export class userControler implements typeUserControler {
    ModelUser: typeUserModel

    constructor(userModel: typeUserModel) {
        this.ModelUser = userModel
    }


    createUser = (req: Request, res: Response) => {
        const user = req.body
        const [status, data] = this.ModelUser.createUser({ user })

        return res.status(200).json({})

    }

}