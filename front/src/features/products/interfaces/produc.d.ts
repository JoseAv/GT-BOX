export interface GetAllProducts {
    name: string
    description: string
    price: number
    is_active: boolean
    id: string
    has_variant: boolean
    date_current: string
    sku: string
}


export interface DbRecibe {
    success: boolean,
    message: string
    httpcode: number,
    time: string,
    data: GetAllProducts[]
}