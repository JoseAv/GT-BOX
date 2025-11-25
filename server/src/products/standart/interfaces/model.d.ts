export interface typeProductModel {
    createProducts: ({ products }: { products: productsCreate }) => Promise<any>

}