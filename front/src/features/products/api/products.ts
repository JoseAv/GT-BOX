import type { ResponseServer } from "@/features/user/interfaces/user"
import type { DbRecibe } from "../interfaces/produc"
import type { productsCreate } from "../schemas/SchemaProducts"

export const getAllProducts = async (): Promise<DbRecibe> => {
    try {
        const json = await fetch('http://localhost:3000/products/standar')
        if (!json.ok) {
            throw new Error('Error en la llamada')
        }

        const response = await json.json()
        return response
    } catch (err) {
        throw new Error(String(err))
    }
}

export const SendProductsCreate = async (products: productsCreate): Promise<ResponseServer> => {

    const formData = new FormData()

    Object.entries(products).forEach(([key, value]) => {
        formData.append(key, String(value))
    })

    try {
        const ReponseProducts = await fetch('http://localhost:3000/products/create', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

        if (!ReponseProducts.ok) {
            const errorData = await ReponseProducts.json()
            throw new Error(errorData.message || 'Error al crear usuario')
        }

        return await ReponseProducts.json()
    } catch (error) {
        throw new Error(String(error))
    }
}