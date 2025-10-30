import type { ResponseServer } from "../interfaces/user"

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