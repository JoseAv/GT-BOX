
import z from "zod";

const SchemaAttribute = z.object({ name: z.string().min(1) })
const Schemavalues = z.object({ name: z.string().min(1) })


export const createAttributeSchema = z.object({
    attribute: SchemaAttribute,
    values: z.array(Schemavalues)
})

export const editAttributeSchema = z.object({
    attribute: SchemaAttribute.extend({ id: z.number().int() }).optional(),
    values: z.array(Schemavalues.extend({ id: z.number().int() })).optional()
})


export type TypeAttributeCreate = z.infer<typeof createAttributeSchema>
export type TypeAttributeEdit = z.infer<typeof editAttributeSchema>