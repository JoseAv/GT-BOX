import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";


interface FormCreateUserProps<T extends FieldValues> {
    formValues: UseFormReturn<T>,
}


export const AttributeForm = <T extends FieldValues>({ formValues }: FormCreateUserProps<T>) => {


    function onSubmit(data: any) {

    }

    return (<>


        <form id="form-rhf-input" onSubmit={formValues.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name={"attribute.name" as Path<T>}
                    control={formValues.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-name">
                                Username
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-input-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="shadcn"
                                autoComplete="name"
                            />
                            <FieldDescription>
                                This is your public display name. Must be between 3 and 10
                                characters. Must only contain letters, numbers, and
                                underscores.
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>
    </>
    )
}