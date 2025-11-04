import type z from "zod"
import { FormCreateUser } from "../components/FormCreate"
import { createFormSchema } from "../schemas/validationCreate"
import { useForm } from "react-hook-form"
import { dateIterar, type formUser } from "../util/dataForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUser } from "../api/user"

type CreateFormSchema = z.infer<typeof createFormSchema>


export const CreateUserPage = () => {

    const loginForm = useForm<z.infer<typeof createFormSchema>>({
        resolver: zodResolver(createFormSchema),
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
                <FormCreateUser<CreateFormSchema, formUser> apiData={CreateUser} loginForm={loginForm} dateIterar={dateIterar} />
            </div>
        </>
    )
}