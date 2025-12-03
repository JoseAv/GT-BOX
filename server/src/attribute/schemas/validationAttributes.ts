import type { ZodError } from "zod"
import { CreateParseSchema, EditParseSchema, type TypeAttributeCreate } from "./AttributesSchemas.js"
import { InvalidationSchema } from "../../shared/error/invalidationSchema.js"

export const validationAttributes = async ({ attribute }: { attribute: TypeAttributeCreate }) => {
    try {
        const resultZod = await CreateParseSchema({ attribute })
        if (!resultZod.success) {
            const result = formatZodError(resultZod.error)
            throw new InvalidationSchema({ status: 300, message: resultZod.error.message, field: result })
        }
        return attribute
    } catch (err) {
        throw err
    }
}

export const validationAttributesEdit = async ({ attribute }: { attribute: TypeAttributeCreate }) => {
    try {
        const resultZod = await EditParseSchema({ attribute })
        if (!resultZod.success) {
            const result = formatZodError(resultZod.error)
            throw new InvalidationSchema({ status: 300, message: resultZod.error.message, field: result })
        }
        return attribute
    } catch (err) {
        throw err
    }
}


function formatZodError(error: ZodError): Record<string, string>[] {
    return error.issues.map((e) => {
        const key = String(e.path[0])
        return { [key]: e.message }
    })
}