import { QueryTypes } from "sequelize"
import type { ResultDB } from "../../shared/interfaces/DB.js"
import { db } from "../../shared/config/db/sequelize.js"
import type { TypeAttributeCreate } from "../schemas/AttributesSchemas.js"
import { InvalidationDB } from "../../shared/error/invalidationSchema.js"

export class AttributesRepo {

    static createAttributes = async ({ attribute }: { attribute: TypeAttributeCreate }) => {
        console.log(attribute)
        try {
            const newProduct: Array<ResultDB> = await db.query('SELECT fn_create_atributte_value(:attribute::jsonb,:values::jsonb) as result;',
                {
                    replacements: {
                        attribute: JSON.stringify(attribute.attribute),
                        values: JSON.stringify(attribute.values)
                    },
                    type: QueryTypes.SELECT
                })

            if (!newProduct || newProduct.length === 0 || !newProduct[0]) {
                throw new InvalidationDB({ message: 'No devolvio ningun resultado o no hubo respuesta' })
            }
            const responseDb = newProduct[0].result
            return [responseDb.http_code, { ...responseDb }]
        } catch (error) {
            console.log(error)
            throw error
        }
    }





}