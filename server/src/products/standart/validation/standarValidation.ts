import { ProductStandart, type productsCreate } from "./standarSchema.js"

export const validationProducts = async ({ products }: { products: productsCreate }) => {
    try {
        const resultZod = await ProductStandart({ products })
        console.log('Validaciones Zod', resultZod)
    } catch (err) {
        console.log(err)
        throw new Error('Error en las validaciones')
    }



}