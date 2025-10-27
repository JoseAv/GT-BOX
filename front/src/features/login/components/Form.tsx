import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { formSchema } from "../schemas/FormLogin"
import type z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoginUser } from "@/shared/auth/api/CallAuth"
import { useNavigate } from "react-router"

export const FormLogin = () => {
    const navigate = useNavigate();
    const loginForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(user: z.infer<typeof formSchema>) {
        try {
            await LoginUser({ user })
            navigate('/dashboard', { replace: true });
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
                    <Controller
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
                    />

                    <Controller
                        name="password"
                        control={loginForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="flex items-center">
                                <FieldLabel htmlFor="input-password" className="sm:text-2xl text-lg flex justify-center ">
                                    Password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="input-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="*********"
                                    autoComplete="off"
                                    className=" max-w-120"
                                    type="password"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Field orientation="horizontal" className="flex justify-center">
                        <Button type="submit" id="login-button" className=" w-full max-w-120">
                            Ingresar
                        </Button>
                    </Field>


                </FieldGroup>


            </form >


        </>

    )


}