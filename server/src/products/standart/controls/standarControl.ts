import type { Request, Response } from "express";
export class ControllStandar {

    constructor() { }

    createProducts(req: Request, res: Response) {
        return res.status(200).json({ hola: 'hola' })

    }

}