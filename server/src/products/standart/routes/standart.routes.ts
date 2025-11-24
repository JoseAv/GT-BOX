import { Router } from "express";
import { ControllStandar } from "../controls/standarControl.js";

export const standarRouter = async () => {
    const newRoute = Router()
    const productsStandart = new ControllStandar()
    newRoute.get('/create', productsStandart.createProducts)
    return newRoute
}