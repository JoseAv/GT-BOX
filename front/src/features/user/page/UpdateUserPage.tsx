import type z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocation } from "react-router"
import { updateSchema } from "../schemas/validationCreate"
import { dateIterar, type formUser } from "../util/dataForm"
import { UpdateUser } from "../api/user"
import { FormCreateUser } from "../components/FormCreate"

type editFormSchema = z.infer<typeof updateSchema>


export const UpdateUserPage = () => {
    const location = useLocation();


    if (!location || !location.state || !location.state.data) {
        return <h1>No hay datos</h1>
    }
    let objetoRecibido = location.state.data
    console.table(objetoRecibido)
    if (objetoRecibido.date_of_birth) {
        let fecha1 = new Date(objetoRecibido.date_of_birth);
        objetoRecibido = { ...objetoRecibido, date_of_birth: fecha1 }
    }

    const loginForm = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            ...objetoRecibido,
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