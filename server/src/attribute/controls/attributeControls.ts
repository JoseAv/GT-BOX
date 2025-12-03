import { InvalidationSchema } from "../../shared/error/invalidationSchema.js";
import type { typeAttributeModel } from "../interfaces/model.js";
import type { Request, Response } from "express";

export class AttributeControls {
    ModelAttribute: typeAttributeModel

    constructor({ AttributeModel }: { AttributeModel: typeAttributeModel }) {
        this.ModelAttribute = AttributeModel
    }

    CreateAttribute = async (req: Request, res: Response) => {
        try {
            const attribute = req.body
            const [status, data] = await this.ModelAttribute.CreateAttribute({ attribute })
            return res.status(status).json({ ...data })
        } catch (error) {
            if (error instanceof InvalidationSchema)
                return res.status(error.status).json({ ...error })

            return res.status(400).json({ error })
        }
    }


    EditAttribute = async (req: Request, res: Response) => {
        try {
            const attribute = req.body
            const [status, data] = await this.ModelAttribute.EditAttribute({ attribute })
            return res.status(status).json({ ...data })
        } catch (error) {
            if (error instanceof InvalidationSchema)
                return res.status(error.status).json({ ...error })
            return res.status(400).json({ error })
        }
    }

}