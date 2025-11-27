import { GetAllProducts } from "../context/getAllProducts"

export const userLinks = {
    Create: '/products/create',
    Edit: '/products/edit/',
    nameCreate: 'Crear Producto',
    nameEdit: 'Editar Producto'
} as const

export const MainProducts = () => {
    const { data } = GetAllProducts()
    return <h1>Hola Products</h1>

}