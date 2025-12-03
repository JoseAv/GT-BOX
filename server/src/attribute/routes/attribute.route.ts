import { Router } from "express";
import type { typeAttributeModel } from "../interfaces/model.js";
import { AttributeControls } from "../controls/attributeControls.js";

export const attributeRouter = async ({ AttributeModel }: { AttributeModel: typeAttributeModel }) => {
    const Routes = Router()
    const newAttributeControls = new AttributeControls({ AttributeModel })
    Routes.post('/create', newAttributeControls.CreateAttribute)

    return Routes

}