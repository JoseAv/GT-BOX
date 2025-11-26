import { QueryTypes } from "sequelize"
import type { ResultDB } from "../../../shared/interfaces/DB.js"
import type { productsCreate } from "../validation/standarSchema.js"
import { db } from "../../../shared/config/db/sequelize.js"
import { InvalidationDB } from "../../../shared/error/invalidationSchema.js"

export class RepositorieModel {


    static createProducts = async ({ products }: { products: productsCreate }) => {
        try {
            const newProduct: Array<ResultDB> = await db.query('SELECT fn_create_product(:name,:description,:price,:sku,:photo) as result;',
                {
                    replacements: {
                        name: products.name,
                        description: products.description,
                        price: products.price,
                        sku: products.sku,
                        photo: products.photo ?? null
                    },
                    type: QueryTypes.SELECT
                })
            if (!newProduct || newProduct.length === 0 || !newProduct[0]) {
                throw new InvalidationDB({ message: 'No devolvio ningun resultado o no hubo respuesta' })

            }

            const responseDb = newProduct[0].result
            return [responseDb.http_code, { ...responseDb }]
        } catch (error) {
            throw error
        }
    }



}