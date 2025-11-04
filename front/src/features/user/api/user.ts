import type z from "zod"
import type { ResponseServer } from "../interfaces/user"
import type { createFormSchema, updateSchema } from "../schemas/validationCreate"

export const getAllUser = async (): Promise<ResponseServer> => {
    try {
        const ResponseUser = await fetch('http://localhost:3000/user/all', {
            method: 'GET',
            credentials: 'include',
        })
        return await ResponseUser.json()
    } catch (error) {
        console.error('FETCH DENTRO DE USUARIO', error)
        throw new Error(String(error))
    }
}


export const CreateUser = async (user: z.infer<typeof createFormSchema>): Promise<ResponseServer> => {
    try {
        const ResponseUser = await fetch('http://localhost:3000/user/create', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })

        if (!ResponseUser.ok) {
            const errorData = await ResponseUser.json()
            throw new Error(errorData.message || 'Error al crear usuario')
        }

        const result = await ResponseUser.json()
        return result
    } catch (error) {
        console.error('FETCH DENTRO DE USUARIO', error)
        throw new Error(String(error))
    }
}



export const UpdateUser = async (user: z.infer<typeof updateSchema>): Promise<ResponseServer> => {
    try {
        const ResponseUser = await fetch('http://localhost:3000/user/create', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })

        if (!ResponseUser.ok) {
            const errorData = await ResponseUser.json()
            throw new Error(errorData.message || 'Error al crear usuario')
        }

        const result = await ResponseUser.json()
        return result
    } catch (error) {
        console.error('FETCH DENTRO DE USUARIO', error)
        throw new Error(String(error))
    }
}