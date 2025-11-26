import z from "zod";

const CreateProductStandar = z.object({
    name: z.string().min(6),
    description: z.string().min(10),
    price: z.number().min(1),
    sku: z.string(),
    // photo: z.instanceof(File).optional().nullable(),
})

export type productsCreate = z.infer<typeof CreateProductStandar>

export const ProductStandart = async ({ products } = {} as { products: productsCreate }) => {
    return CreateProductStandar.safeParse(products)
}