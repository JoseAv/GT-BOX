import { useQuery } from "@tanstack/react-query"
import { getAllAttributes } from "../api/getAttributes"

export const ContextAttributes = () => {

    const { data, isLoading, isError } = useQuery({ queryKey: ['get-attributes'], queryFn: getAllAttributes })


    return { data, isLoading, isError }

}