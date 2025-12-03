import type { typeAttributeModel } from "../interfaces/model.js";
import type { Request, Response } from "express";

export class AttributeControls {
    ModelAttribute: typeAttributeModel

    constructor({ AttributeModel }: { AttributeModel: typeAttributeModel }) {
        this.ModelAttribute = AttributeModel
    }

    CreateAttribute = async (req: Request, res: Response) => {
        console.log(req.body)
        res.send('hola')


    }


}