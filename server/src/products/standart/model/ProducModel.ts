import { RepositorieModel } from "../repositories/standarRepositorie.js"
import type { editProducts, productsCreate } from "../validation/standarSchema.js"
import { validationEditProducts, validationProducts } from "../validation/standarValidation.js"

export class ProductsModel {


    static createProducts = async ({ products }: { products: productsCreate }) => {
        try {
            const resultValidation = await validationProducts({ products })
            return RepositorieModel.createProducts({ products: resultValidation })
        } catch (error) {
            throw error
        }
    }


    static editProducts = async ({ products }: { products: editProducts }) => {
        try {
            const resultValidation = await validationEditProducts({ products })
            return RepositorieModel.editProducts({ products: resultValidation })
        } catch (error) {
            throw error
        }
    }


}