import { useQuery, useQueryClient } from "@tanstack/react-query"
import { CallAuth } from "../api/CallAuth"

export const InfoUser = () => {
    const { status, data, error, refetch, isPending } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            return await CallAuth()
        },
    })
    return { status, data, error, refetch, isPending }
}


export const LogOut = () => {
    const infoUser = useQueryClient()
    const logOut = async () => {
        await logOut()
        infoUser.removeQueries({ queryKey: ['userInfo'] })
    }

    return logOut
}