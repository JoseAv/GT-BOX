import { AttributesRepo } from "../repositories/attributeRepo.js";
import type { TypeAttributeCreate } from "../schemas/AttributesSchemas.js";
import { validationAttributes } from "../schemas/validationAttributes.js";

export class AttributeModel {


    static CreateAttribute = async ({ attribute }: { attribute: TypeAttributeCreate }) => {
        try {
            const resultValidation = await validationAttributes({ attribute })
            return AttributesRepo.createAttributes({ attribute: resultValidation })
        } catch (error) {
            throw error
        }
    }


}