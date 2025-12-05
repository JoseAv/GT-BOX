import { useForm } from "react-hook-form"
import { editAttributeSchema, type TypeAttributeEdit } from "../schemas/attributeSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AttributeForm } from "../util/Form"
import { PatchAttribute } from "../api/CreateEditAttributes"
import { useLocation } from "react-router"
import { ContextOneAttributes } from "../context/getAttributes"
import { useEffect } from "react"

export const EditAttributePage = () => {
    const location = useLocation();

    const objetoRecibido = location?.state?.data;
    if (!objetoRecibido) {
        return <h1>No hay datos</h1>;
    }
    const { data, isLoading, isError } = ContextOneAttributes({
        id: location?.state?.data.id
    });



    const formValues = useForm<TypeAttributeEdit>({
        resolver: zodResolver(editAttributeSchema),
        defaultValues: {
            attribute: objetoRecibido,
            values: []
        },
    });

    useEffect(() => {
        if (data) {
            formValues.reset({
                attribute: objetoRecibido,
                values: data.data.values
            });
        }
    }, [data]);

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error Page</h1>
    if (!data) return <h1>No Information</h1>



    return <AttributeForm<TypeAttributeEdit> apiData={PatchAttribute} formValues={formValues} />;
}