import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useFieldArray, type ArrayPath, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useNavigate } from "react-router";
import type { ResponseServer } from "@/features/user/interfaces/user";
import { useMutation } from "@tanstack/react-query";
import { useNotificationStore } from "@/shared/notifications/Notifications";
import type { typeArrayValues } from "../schemas/attributeSchema";


interface FormCreateUserProps<T extends FieldValues> {
    formValues: UseFormReturn<T>,
    apiData: (data: T) => Promise<ResponseServer>,
    edit?: boolean
}


export const AttributeForm = <T extends FieldValues>({ formValues, apiData, edit = false }: FormCreateUserProps<T>) => {
    const [showError, setError] = useState(false)
    const [dataDelete, setDataDelete] = useState<typeArrayValues[]>([])
    const handleUpdate = useNotificationStore((state) => state.updateCount)

    const navigate = useNavigate();
    const { fields, append, remove } = useFieldArray({
        control: formValues.control,
        name: "values" as ArrayPath<T>,
        keyName: "fieldId"
    })


    const mutation = useMutation({
        mutationFn: apiData,
        onError: () => {
            setError(true)
        },
        onSuccess: () => {
            handleUpdate()
            navigate('/attributes')
        },
    })


    async function onSubmit(data: T) {
        if (!edit) {
            mutation.mutate(data)
            return
        }

        let accionValues: Record<'deleteValues' | 'createValues' | 'updateValues', typeArrayValues[]> = {
            'deleteValues': [],
            'createValues': [],
            'updateValues': []
        }

        for (let value of data.values) {
            if (value.id) {
                accionValues['updateValues'].push(value as typeArrayValues)
            }

            if (!value.id) {
                accionValues['createValues'].push(value)
            }

        }
        accionValues['deleteValues'].push(...dataDelete)
        const newData = { ...data, values: { ...accionValues } }

        mutation.mutate(newData as any)
    }

    return (<>

        {showError ? <Toaster richColors position="top-right" /> : null}

        <form id="form-rhf-attributes" onSubmit={formValues.handleSubmit(onSubmit)}>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Atributo
            </h2>
            <FieldGroup>
                <Controller
                    name={"attribute.name" as Path<T>}
                    control={formValues.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-name">
                                Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-input-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="shadcn"
                                autoComplete="name"
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Valores
                </h2>

                <Button type="button" onClick={() => append({ name: '' } as any)}>
                    Agregar
                </Button>
            </div>

            <FieldGroup>
                {fields.map((field, index) => (
                    <div key={field.fieldId}>
                        <div>

                            <Button type="button" variant='secondary' onClick={() => {
                                if (fields.length > 1) {
                                    console.log('entrada aqui')
                                    const field = fields[index] as any
                                    setDataDelete((prev: typeArrayValues[]) => {
                                        if (fields && field.id) {
                                            return [...prev, { name: field.name, id: field.id }]
                                        }
                                        return prev
                                    })

                                    remove(index)
                                }
                            }}>
                                Eliminar
                            </Button>
                        </div>
                        <Controller
                            // en name colocar index que es a donde pertenece
                            name={`values.${index}.name` as Path<T>}
                            control={formValues.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-input-values.name">
                                        Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-values.name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="S M L XL"
                                        autoComplete="name"
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                ))}
            </FieldGroup>

            <Field orientation="horizontal">
                {/* form debe de coincidir con el id que tiene el formulario */}
                <Button type="submit" form="form-rhf-attributes" onClick={() => 'Hola'}>
                    Finalizar
                </Button>
            </Field>


        </form>
    </>
    )
}


