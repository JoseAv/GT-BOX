import { RepositorieModel } from "../repositories/standarRepositorie.js"
import type { productsCreate } from "../validation/standarSchema.js"
import { validationProducts } from "../validation/standarValidation.js"

export class ProductsModel {


    static createProducts = async ({ products }: { products: productsCreate }) => {
        try {
            const resultValidation = await validationProducts({ products })
            return RepositorieModel.createProducts({ products: resultValidation })
        } catch (error) {
            throw error
        }
    }



}