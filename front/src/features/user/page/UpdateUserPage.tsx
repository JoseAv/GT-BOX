import type z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocation, useNavigate } from "react-router"
import { updateSchema } from "../schemas/validationCreate"
import { dateIterar, type formUser } from "../util/dataForm"
import { UpdateUser } from "../api/user"
import { FormCreateUser } from "../components/FormCreate"

type editFormSchema = z.infer<typeof updateSchema>


export const UpdateUserPage = () => {
    const navigate = useNavigate()
    const location = useLocation();

    if (!location || !location.state || !location.state.data) {
        return <h1>No hay datos</h1>
    }
    const objetoRecibido = location.state.data
    console.log('OBJETO PASADO')
    console.table(objetoRecibido)


    const loginForm = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            first_name: "",
            second_name: "",
            first_last_name: "",
            password: "",
            user_name: "",
            email: "",
            date_of_birth: new Date()
        }
    })
    return (
        <>

            <div className="w-full p-12 flex items-center justify-center">
                <FormCreateUser<editFormSchema, formUser> apiData={UpdateUser} loginForm={loginForm} dateIterar={dateIterar} />
            </div>
        </>
    )
}