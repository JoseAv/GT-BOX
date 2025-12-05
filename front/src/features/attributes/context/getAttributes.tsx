import { useQuery } from "@tanstack/react-query"
import { getAllAttributes, getOneAttributes } from "../api/getAttributes"

export const ContextAttributes = () => {

    const { data, isLoading, isError } = useQuery({ queryKey: ['get-attributes'], queryFn: getAllAttributes })


    return { data, isLoading, isError }

}


export const ContextOneAttributes = ({ id }: { id: number }) => {

    const { data, isLoading, isError } = useQuery({ queryKey: [`get-${id}`], queryFn: () => getOneAttributes({ id }) })

    return { data, isLoading, isError }

}