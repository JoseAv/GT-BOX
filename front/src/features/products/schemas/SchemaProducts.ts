import z, { boolean, number } from "zod";

export const CreateProductStandar = z.object({
    name: z.string().min(6),
    description: z.string().min(10),
    price: z.number().min(1),
    sku: z.string(),
    photo: z.instanceof(File).optional().nullable(),
})

export const editProduct = CreateProductStandar.partial().extend({ id: number().int(), is_active: boolean().optional() })

export type productsCreate = z.infer<typeof CreateProductStandar>
export type editProducts = z.infer<typeof editProduct>









