import z from "zod";

const SchemaAttribute = z.object({ name: z.string().min(1) })
const Schemavalues = z.object({ name: z.string().min(1) })


const createAttributeSchema = z.object({
    attribute: SchemaAttribute,
    values: z.array(Schemavalues)
})

const editAttributeSchema = z.object({
    attribute: SchemaAttribute.extend({ id: z.number().int() }).optional(),
    values: z.object({
        deleteValues: z.array(Schemavalues.optional()),
        createValues: z.array(Schemavalues.optional()),
        updateValues: z.array(Schemavalues.optional())
    }).optional()

})


export type TypeAttributeCreate = z.infer<typeof createAttributeSchema>
export type TypeAttributeEdit = z.infer<typeof editAttributeSchema>

export const CreateParseSchema = async ({ attribute }: { attribute: TypeAttributeCreate }) => {
    return createAttributeSchema.safeParse(attribute)
}

export const EditParseSchema = async ({ attribute }: { attribute: TypeAttributeEdit }) => {
    return editAttributeSchema.safeParse(attribute)
}

