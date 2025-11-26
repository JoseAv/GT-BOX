import type { Request, Response } from "express";
import type { typeProductModel } from "../interfaces/model.js";
import { InvalidationSchema } from "../../../shared/error/invalidationSchema.js";
export class ControllStandar {
    ModelProducts: typeProductModel;

    constructor({ ProductsModel } = {} as { ProductsModel: typeProductModel }) {
        this.ModelProducts = ProductsModel;
    }

    createProducts = async (req: Request, res: Response) => {
        try {
            const products = { ...req.body, price: Number(req.body.price) }
            const result = await this.ModelProducts.createProducts({ products })
            return res.status(200).json({
                hola: 'enviado Exitosamente'
            })

        } catch (error) {
            if (error instanceof InvalidationSchema)
                return res.status(error.status).json({ ...error })

            return res.status(400).json({ error })
        }


    }

}