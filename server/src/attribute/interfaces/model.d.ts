export interface typeAttributeModel {
    CreateAttribute: ({ attribute }: { attribute: TypeAttributeCreate }) => Promise<any>
    EditAttribute: ({ attribute }: { attribute: TypeAttributeCreate }) => Promise<any>
    GetAllAttribute: () => Promise<any>
    GetOneAttribute: ({ id }: { id: number }) => Promise<any>



}