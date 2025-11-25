import { Router } from "express";
import { ControllStandar } from "../controls/standarControl.js";
import type { typeProductModel } from "../interfaces/model.js";

export const standarRouter = async ({ ProductsModel }: { ProductsModel: typeProductModel }) => {
    const newRoute = Router()
    const productsStandart = new ControllStandar({ ProductsModel })
    newRoute.post('/create', await productsStandart.createProducts)
    return newRoute
}