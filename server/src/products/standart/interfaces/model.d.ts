export interface typeProductModel {
    createProducts: ({ products }: { products: productsCreate }) => Promise<any>
    editProducts: ({ products }: { products: editProducts }) => Promise<any>
    getAllProductsStandart: () => Promise<any>
}