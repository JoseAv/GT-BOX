import { id } from "zod/locales";
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
            console.log(attribute)
            const [status, data] = await this.ModelAttribute.EditAttribute({ attribute })
            return res.status(status).json({ ...data })
        } catch (error) {
            if (error instanceof InvalidationSchema)
                return res.status(error.status).json({ ...error })
            return res.status(400).json({ error })
        }
    }

    GetAllAttribute = async (_: Request, res: Response) => {
        try {
            const [status, data] = await this.ModelAttribute.GetAllAttribute()
            return res.status(status).json({ ...data })
        } catch (error) {
            if (error instanceof InvalidationSchema)
                return res.status(error.status).json({ ...error })
            return res.status(400).json({ error })
        }
    }

    GetOneAttribute = async (req: Request, res: Response) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({ message: 'Necesita un id Valido' })
            }

            const id = +req.params.id

            const [status, data] = await this.ModelAttribute.GetOneAttribute({ id: id as number })
            return res.status(status).json({ ...data })
        } catch (error) {
            if (error instanceof InvalidationSchema)
                return res.status(error.status).json({ ...error })
            return res.status(400).json({ error })
        }
    }

}