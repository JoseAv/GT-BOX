import { useForm } from "react-hook-form"
import { createAttributeSchema, type TypeAttributeCreate } from "../schemas/attributeSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AttributeForm } from "../util/Form"

export const CreateAttributePage = () => {


    const form = {
        "attribute": { "name": "Prueba Postman 3" },
        "values": [{ "name": "Prueba Values Postman 3" }]
    }

    const formValues = useForm<TypeAttributeCreate>({
        resolver: zodResolver(createAttributeSchema),
        defaultValues: {
            ...form
        },
    })


    return <><AttributeForm<TypeAttributeCreate> formValues={formValues} /> </>


}