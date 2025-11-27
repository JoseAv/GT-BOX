import { FormCreateUser } from "@/features/user/components/FormCreate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateProductStandar, type productsCreate } from "../schemas/SchemaProducts"
import { ProductsDataForm, type formProducts } from "../api/form"
import { SendProductsCreate } from "../api/products"

export const CreateProducts = () => {

    const loginForm = useForm<productsCreate>({
        resolver: zodResolver(CreateProductStandar),
        defaultValues: {
            name: '',
            description: '',
            price: 1,
            sku: '',
        }
    })
    return (
        <>

            <div className="w-full p-12 flex items-center justify-center">
                <FormCreateUser<productsCreate, formProducts> apiData={SendProductsCreate} loginForm={loginForm} dateIterar={ProductsDataForm} />
            </div>
        </>
    )
}