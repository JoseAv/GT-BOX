export const ProductsDataForm: formProducts = {
    name: { htmlFor: 'input-name', placeholder: 'Escribe tu nombre', type: 'text', name: 'Products Name', class: '' },
    description: { htmlFor: 'input-description', placeholder: 'Esto es una despcrion', type: 'text', name: 'Description', class: '' },
    price: { htmlFor: 'input-price', placeholder: '200, 300 , ...', type: 'number', name: 'Price', class: '', valueAsNumber: true },
    sku: { htmlFor: 'input-sku', placeholder: 'SKU-200', type: 'text', name: 'SKU', class: '' },
    // photo: { htmlFor: 'input-first_name', placeholder: 'Escribe tu nombre', type: 'text', name: 'Photo', class: '' },
}
export const ValuesKeys = {
    name: 'name',
    description: 'description',
    price: 'price',
    sku: 'sku',
    photo: 'photo',
} as const

// Formatiar Campos para verse mejor
export const formatHeader = (key: string): string => {
    return key
        .split('_')
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(' ');
}

export type TypeKeys = keyof typeof ValuesKeys;

export interface formProducts {
    name: Name
    description: Description
    price: Price
    sku: Sku
    photo?: Photo
}

export interface Sku {
    htmlFor: string
    placeholder: string
    type: string
    name: string
    class: string
}

export interface Photo {
    htmlFor: string
    placeholder: string
    type: string
    name: string
    class: string
}

export interface Name {
    htmlFor: string
    placeholder: string
    type: string
    name: string
    class: string
}

export interface Description {
    htmlFor: string
    placeholder: string
    type: string
    name: string
    class: string
}

export interface Price {
    htmlFor: string
    placeholder: string
    type: string
    name: string
    class: string
    valueAsNumber: boolean
}
