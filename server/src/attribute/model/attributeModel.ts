import { AttributesRepo } from "../repositories/attributeRepo.js";
import type { TypeAttributeCreate, TypeAttributeEdit } from "../schemas/AttributesSchemas.js";
import { validationAttributes, validationAttributesEdit } from "../schemas/validationAttributes.js";

export class AttributeModel {


    static CreateAttribute = async ({ attribute }: { attribute: TypeAttributeCreate }) => {
        try {
            const resultValidation = await validationAttributes({ attribute })
            return AttributesRepo.createAttributes({ attribute: resultValidation })
        } catch (error) {
            throw error
        }
    }

    static EditAttribute = async ({ attribute }: { attribute: TypeAttributeEdit }) => {
        try {
            const resultValidation = await validationAttributesEdit({ attribute })
            return AttributesRepo.editAttributes({ attribute: resultValidation })
        } catch (error) {
            throw error
        }
    }



    static GetAllAttribute = async () => {
        try {
            return AttributesRepo.getAllAttributes()
        } catch (error) {
            throw error
        }
    }


}