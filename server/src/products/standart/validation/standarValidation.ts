import type { ZodError } from "zod"
import { InvalidationSchema } from "../../../shared/error/invalidationSchema.js"
import { ProductStandart, type productsCreate } from "./standarSchema.js"

export const validationProducts = async ({ products }: { products: productsCreate }) => {
    try {
        const resultZod = await ProductStandart({ products })
        if (!resultZod.success) {
            const result = formatZodError(resultZod.error)
            throw new InvalidationSchema({ status: 300, message: resultZod.error.message, field: result })
        }
        return products
    } catch (err) {
        throw err
    }


}

function formatZodError(error: ZodError): Record<string, string>[] {
    return error.issues.map((e) => {
        const key = String(e.path[0])
        return { [key]: e.message }
    })
}