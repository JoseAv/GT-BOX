import z, { boolean, number } from "zod";

const CreateProductStandar = z.object({
    name: z.string().min(6),
    description: z.string().min(10),
    price: z.number().min(1),
    sku: z.string(),
    photo: z.instanceof(File).optional().nullable(),
})

const editProduct = CreateProductStandar.partial().extend({ id: number().int(), is_active: boolean().optional() })

export type productsCreate = z.infer<typeof CreateProductStandar>
export type editProducts = z.infer<typeof editProduct>

export const ProductStandart = async ({ products } = {} as { products: productsCreate }) => {
    return CreateProductStandar.safeParse(products)
}

export const editStandart = async ({ products } = {} as { products: editProducts }) => {
    return editProduct.safeParse(products)
}