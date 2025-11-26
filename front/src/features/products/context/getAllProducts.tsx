import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../api/products"

export const GetAllProducts = () => {
    const { status, data, error, refetch, isPending } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            return await getAllProducts()
        },
    })
    return { status, data, error, refetch, isPending }

}