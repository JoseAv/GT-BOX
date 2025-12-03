import z, { number } from "zod";

const SchemaAttribute = z.object({ name: z.string().min(1) })
const Schemavalues = z.object({ name: z.string().min(1) })


const createAttributeSchema = z.object({
    attribute: SchemaAttribute,
    values: Schemavalues
})

const editAttributeSchema = z.object({
    attribute: SchemaAttribute.extend({ id: z.number().int() }).optional(),
    values: Schemavalues.extend({ id: z.number().int() }).optional()

})


export type TypeAttributeCreate = z.infer<typeof createAttributeSchema>
export type TypeAttributeEdit = z.infer<typeof editAttributeSchema>

export const CreateParseSchema = async ({ attribute }: { attribute: TypeAttributeCreate }) => {
    return createAttributeSchema.safeParse(attribute)
}

export const EditParseSchema = async ({ attribute }: { attribute: TypeAttributeCreate }) => {
    return editAttributeSchema.safeParse(attribute)
}