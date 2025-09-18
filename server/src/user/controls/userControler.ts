import type { Request, Response } from "express";
import type { typeUserControler, typeUserModel } from "../interfaces/user.js";


export class userControler implements typeUserControler {
    ModelUser: typeUserModel

    constructor(userModel: typeUserModel) {
        this.ModelUser = userModel
    }


    createUser = (req: Request, res: Response) => {
        console.log(req.body)


        return res.status(200).json({})

    }

}