import { useQuery } from "@tanstack/react-query"
import { CallAuth, PruebaUserCookie } from "../api/CallAuth"




export const InfoUser = () => {
    const query = useQuery({
        queryKey: ['userInfo'],
        queryFn: PruebaUserCookie
    })
    return query
}