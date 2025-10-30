import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import type z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoginUser } from "@/shared/auth/api/CallAuth"
import { useNavigate } from "react-router"
import { createFormSchema } from "../schemas/validationCreate"

export const FormCreateUser = () => {
    const navigate = useNavigate();
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

    const dateIterar = {
        first_name: { htmlFor: 'input-first_name', placeholder: 'Escribe tu nombre', type: 'text', },
        second_name: { htmlFor: 'input-second_name', placeholder: 'Escribe tu nombre', type: 'text' },
        first_last_name: { htmlFor: 'input-first_last_name', placeholder: 'Escribe tu nombre', type: 'text' },
        password: { htmlFor: 'input-password', placeholder: 'Escribe tu nombre', type: 'password' },
        user_name: { htmlFor: 'input-user_name', placeholder: 'Escribe tu nombre', type: 'text' },
        email: { htmlFor: 'input-email', placeholder: 'Escribe tu nombre', type: 'email' },
    }
    // date_of_birth: { htmlFor: 'input-date_of_birth', placeholder: 'Escribe tu nombre', type: 'date' },
    const ValuesKeys = {
        first_name: "first_name",
        second_name: "second_name",
        first_last_name: "first_last_name",
        password: "user_name",
        user_name: "user_name",
        email: "email",
    }
    type TypeKeys = keyof typeof ValuesKeys;


    async function onSubmit(user: z.infer<typeof createFormSchema>) {
        try {
            await LoginUser({ user })
            // navigate('/dashboard', { replace: true });
        } catch (error) {
            const fields = ['email', 'password'] as const
            for (let field of fields) {
                loginForm.setError(field, { type: 'manual', message: 'Usuario no Existe' })
            }
        } finally {
            console.log('Fin Del SPINNER')
        }
    }


    return (
        <>
            <form id="login-form" onSubmit={loginForm.handleSubmit(onSubmit)} className="w-full">
                <FieldGroup className="w-full h-ull  flex flex-col justify-center items-center">
                    {Object.entries(dateIterar).map(([key, value]) => {
                        return (
                            <Controller
                                key={value.htmlFor}
                                name={key as TypeKeys}
                                control={loginForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="flex items-center justify-center">
                                        <FieldLabel htmlFor={value.htmlFor} className=" sm:text-2xl text-lg flex justify-center">
                                            {key}
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id={value.htmlFor}
                                            aria-invalid={fieldState.invalid}
                                            placeholder={value.placeholder}
                                            autoComplete="off"
                                            className=" max-w-120"
                                            type={value.type}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        )
                    })}

                    {/* <Controller
                        name="email"
                        control={loginForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="flex items-center justify-center">
                                <FieldLabel htmlFor="input-email" className=" sm:text-2xl text-lg flex justify-center">
                                    Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="input-email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="@gmail.com "
                                    autoComplete="off"
                                    className=" max-w-120"
                                    type="email"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    /> */}



                    <Field orientation="horizontal" className="flex justify-center">
                        <Button type="submit" id="login-button" className=" w-full max-w-120">
                            Crear Usuario
                        </Button>
                    </Field>


                </FieldGroup>


            </form >


        </>

    )


}