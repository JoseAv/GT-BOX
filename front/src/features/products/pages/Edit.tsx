import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocation } from "react-router"
import { editProduct, type editProducts } from "../schemas/SchemaProducts"
import { ProductsDataForm, type formProducts } from "../api/form"
import { SendProductsEdit } from "../api/products"
import { FormCreateUser } from "@/features/user/components/FormCreate"


export const UpdateProductsPage = () => {
    const location = useLocation();


    if (!location || !location.state || !location.state.data) {
        return <h1>No hay datos</h1>
    }
    let objetoRecibido = location.state.data

    const ProductsForm = useForm<editProducts>({
        resolver: zodResolver(editProduct),
        defaultValues: {
            ...objetoRecibido,
        }
    })

    return (
        <>

            <div className="w-full p-12 flex items-center justify-center">
                <FormCreateUser<editProducts, formProducts> apiData={SendProductsEdit} loginForm={ProductsForm} dateIterar={ProductsDataForm} />
            </div>
        </>
    )
}