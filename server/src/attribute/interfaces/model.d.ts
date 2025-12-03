export interface typeAttributeModel {
    CreateAttribute: ({ attribute }: { attribute: TypeAttributeCreate }) => Promise<any>
    EditAttribute: ({ attribute }: { attribute: TypeAttributeCreate }) => Promise<any>
    GetAllAttribute: () => Promise<any>


}