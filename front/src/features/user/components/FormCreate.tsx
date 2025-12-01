import { Controller, type FieldValues, type Path, type UseFormReturn as DataFormReturn } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { useNotificationStore } from "@/shared/notifications/Notifications"
import { useState } from "react"
import type { ResponseServer } from "../interfaces/user"

interface FormCreateUserProps<T extends FieldValues, D extends Record<string, any>> {
    apiData: (data: T) => Promise<ResponseServer>,
    loginForm: DataFormReturn<T>,
    dateIterar: D
}

export const FormCreateUser = <T extends FieldValues, D extends Record<string, any>>({
    apiData,
    loginForm,
    dateIterar
}: FormCreateUserProps<T, D>) => {
    const handleUpdate = useNotificationStore((state) => state.updateCount)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [showError, setError] = useState(false)

    const mutation = useMutation({
        mutationFn: apiData,
        onError: () => {
            setError(true)
        },
        onSuccess: () => {
            handleUpdate()
            navigate('/products')
        },
    })


    async function onSubmit(data: T) {
        mutation.mutate(data)
    }

    return (
        <>
            {showError ? <Toaster richColors position="top-right" /> : null}

            <form id="login-form" onSubmit={loginForm.handleSubmit(onSubmit)} className="max-w-5xl flex justify-center  items-center w-full">
                <FieldGroup className=" grid w-full grid-cols-1 items-center justify-center sm:grid-cols-2">
                    {Object.entries(dateIterar).map(([key, value]) => {

                        if (key !== 'date_of_birth') {
                            return (
                                <Controller
                                    key={value.htmlFor}
                                    name={key as Path<T>}
                                    control={loginForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid} className="flex items-center justify-center w-full">
                                            <FieldLabel htmlFor={value.htmlFor} className=" sm:text-2xl text-lg flex justify-center">
                                                {value.name}
                                            </FieldLabel>
                                            {value.valueAsNumber === true ?
                                                <Input
                                                    {...field}
                                                    id={value.htmlFor}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder={value.placeholder}
                                                    autoComplete="off"
                                                    className="h-13"
                                                    type={value.type}
                                                    // onChange directamente lo guarda en el schema de reackHookForm pero convertido
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                                    value={field.value || ''}
                                                />
                                                :
                                                <Input
                                                    {...field}
                                                    id={value.htmlFor}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder={value.placeholder}
                                                    autoComplete="off"
                                                    className="h-13"
                                                    type={value.type}
                                                />
                                            }

                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            )

                        }

                        return (
                            <Controller
                                key={value.htmlFor}
                                name={'date_of_birth' as Path<T>}
                                control={loginForm.control}
                                render={({ field, fieldState }) => (
                                    <div className="flex flex-col gap-3 justify-center items-center">
                                        <Label htmlFor={value.htmlFor} className=" sm:text-2xl text-lg flex justify-center">
                                            Date of birth
                                        </Label>
                                        <Popover open={open} onOpenChange={setOpen} >
                                            <PopoverTrigger asChild className="w-48">
                                                <Button
                                                    variant="outline"
                                                    id={value.id}
                                                    className="font-normal max-w-120 w-full h-13"
                                                >
                                                    {field.value ? field.value.toLocaleDateString() : "Select date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    className="max-w-120 w-full"
                                                    mode="single"
                                                    selected={field.value}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        field.onChange(date)
                                                        setOpen(false)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </div>
                                )
                                }

                            />

                        )

                    })}


                    <Field className="flex justify-center w-full items-center sm:col-span-2">
                        <Button type="submit" id="login-button" className=" w-full max-w-120 h-12 text-xl cursor-alias"
                            onClick={() => {
                                loginForm.handleSubmit(onSubmit)();
                            }}
                        >
                            Crear Productos
                        </Button>
                    </Field>


                </FieldGroup>
            </form >


        </>

    )


}