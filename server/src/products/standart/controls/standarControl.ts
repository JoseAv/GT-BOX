import type { Request, Response } from "express";
import type { typeProductModel } from "../interfaces/model.js";
export class ControllStandar {
    ModelProducts;

    constructor({ ProductsModel } = {} as { ProductsModel: typeProductModel }) {
        this.ModelProducts = ProductsModel;
    }

    async createProducts(req: Request, res: Response) {
        try {
            console.log(req.body)
            return res.status(200).json({
                hola: req.body
            })

        } catch (error) {

        }


    }

}