import { useQuery } from "@tanstack/react-query"
import { getAllUser } from "../api/user"

export const AllUser = () => {
    const { status, data, error, refetch, isPending } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            return await getAllUser()
        },
    })
    return { status, data, error, refetch, isPending }
}
