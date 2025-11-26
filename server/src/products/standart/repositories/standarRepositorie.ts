import { QueryTypes } from "sequelize"
import type { ResultDB } from "../../../shared/interfaces/DB.js"
import type { editProducts, productsCreate } from "../validation/standarSchema.js"
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

    static editProducts = async ({ products }: { products: editProducts }) => {
        try {
            const newProduct: Array<ResultDB> = await db.query('SELECT fn_edit_product(:id_product,:name,:description,:price,:photo,:is_active,:sku) as result;',
                {
                    replacements: {
                        id_product: products.id_product,
                        name: products.name ?? null,
                        description: products.description ?? null,
                        price: products.price ?? null,
                        photo: products.photo ?? null,
                        is_active: products.is_active ?? null,
                        sku: products.sku ?? null,
                    },
                    type: QueryTypes.SELECT
                })
            if (!newProduct || newProduct.length === 0 || !newProduct[0]) {
                throw new InvalidationDB({ message: 'No devolvio ningun resultado o no hubo respuesta' })

            }

            const responseDb = newProduct[0].result
            return [responseDb.http_code, { ...responseDb }]
        } catch (error) {
            if (error instanceof InvalidationDB)
                throw error

            console.log(error)
        }
    }

    static getAllProducts = async () => {
        try {
            const newProduct: Array<ResultDB> = await db.query('SELECT fn_get_all_products() as result;',
                {
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