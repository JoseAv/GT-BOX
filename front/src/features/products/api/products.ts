import type { DbRecibe } from "../interfaces/produc"

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