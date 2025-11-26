import { QueryTypes } from "sequelize"
import type { ResultDB } from "../../../shared/interfaces/DB.js"
import type { productsCreate } from "../validation/standarSchema.js"
import { db } from "../../../shared/config/db/sequelize.js"
import { InvalidationDB } from "../../../shared/error/invalidationSchema.js"

export class RepositorieModel {


    static createProducts = async ({ products }: { products: productsCreate }) => {
        try {
            const queryGetAllUser: Array<ResultDB> = await db.query('SELECT (fn_get_all_users()) as result;', { type: QueryTypes.SELECT })
            if (!queryGetAllUser || queryGetAllUser.length === 0 || !queryGetAllUser[0]) {
                throw new InvalidationDB({ message: 'No devolvio ningun resultado o no hubo respuesta' })

            }

            const responseDb = queryGetAllUser[0].result

            return [responseDb.http_code, { ...responseDb }]

        } catch (error) {
            throw error
        }
    }



}