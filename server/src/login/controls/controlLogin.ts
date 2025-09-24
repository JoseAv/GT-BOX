import type { Request, Response } from "express";
import type { typeLoginModel } from "../interfaces/login.js";



export class controlLogin {
    controlModelLogin: typeLoginModel;

    constructor({ loginModel }: { loginModel: typeLoginModel }) {
        this.controlModelLogin = loginModel
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        return res.status(Number(200)).json({})
    }

}