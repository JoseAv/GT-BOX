import type { productsCreate } from "../validation/standarSchema.js"
import { validationProducts } from "../validation/standarValidation.js"

export class ProductsModel {


    static createProducts = async ({ products }: { products: productsCreate }) => {
        try {
            console.log(products)
            const resultValidation = await validationProducts({ products })

        } catch (error) {
            throw error
        }
    }



}