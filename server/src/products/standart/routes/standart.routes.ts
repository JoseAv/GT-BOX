import { Router } from "express";
import { ControllStandar } from "../controls/standarControl.js";
import type { typeProductModel } from "../interfaces/model.js";
import multer from "multer";

export const standarRouter = async ({ ProductsModel }: { ProductsModel: typeProductModel }) => {
    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage })

    const newRoute = Router()
    const productsStandart = new ControllStandar({ ProductsModel })
    newRoute.post('/create', upload.none(), productsStandart.createProducts)
    newRoute.patch('/edit', upload.none(), productsStandart.editProducts)
    newRoute.get('/standar', upload.none(), productsStandart.getAllProductsStandart)


    return newRoute
}