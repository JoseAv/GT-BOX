import { useForm } from "react-hook-form"
import { createAttributeSchema, type TypeAttributeCreate } from "../schemas/attributeSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AttributeForm } from "../util/Form"
import { PostNewAttribute } from "../api/CreateEditAttributes"

export const CreateAttributePage = () => {


    const form = {
        "attribute": { "name": "" },
        "values": [{ "name": "" }]
    }

    const formValues = useForm<TypeAttributeCreate>({
        resolver: zodResolver(createAttributeSchema),
        defaultValues: {
            ...form
        },
    })


    return <><AttributeForm<TypeAttributeCreate> apiData={PostNewAttribute} formValues={formValues} /> </>


}