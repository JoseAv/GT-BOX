export const dateIterar = {
    first_name: { htmlFor: 'input-first_name', placeholder: 'Escribe tu nombre', type: 'text', name: 'First Name', class: 'grid-cols-2' },
    second_name: { htmlFor: 'input-second_name', placeholder: 'Escribe tu segundo nombre', type: 'text', name: 'Second Name' },
    first_last_name: { htmlFor: 'input-first_last_name', placeholder: 'Escribe tu apellido', type: 'text', name: 'Last Name' },
    password: { htmlFor: 'input-password', placeholder: '*******', type: 'password', name: 'Password' },
    user_name: { htmlFor: 'input-user_name', placeholder: 'jm_arana', type: 'text', name: 'User Name' },
    email: { htmlFor: 'input-email', placeholder: '@gmail.com', type: 'email', name: 'Email' },
}
// date_of_birth: { htmlFor: 'input-date_of_birth', placeholder: 'Escribe tu nombre', type: 'date' },
export const ValuesKeys = {
    first_name: "first_name",
    second_name: "second_name",
    first_last_name: "first_last_name",
    password: "user_name",
    user_name: "user_name",
    email: "email",
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