import type { authUser, sendInfoLogin } from "../interfaces/Auth"

export const CallAuth = async (): Promise<boolean | authUser> => {
    try {
        const ResponseUser = await fetch('http://localhost:3000/login/auth/me', {
            method: 'GET',
            credentials: 'include'
        })

        if (!ResponseUser.ok) {
            throw new Error('Error en refresh Session')
        }

        return ResponseUser.json()
    } catch (error) {
        console.error('FETCH DENTRO DE USUARIO', error)
        throw new Error(String(error))
    }
}


export const LoginUser = async ({ user }: { user: sendInfoLogin }): Promise<boolean | authUser> => {

    try {
        const ResponseUser = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'CONTENT-TYPE': 'application/json',
            },
            body: JSON.stringify(user)
        })
        if (!ResponseUser.ok)
            throw new Error('Error en logiar al usuario')

        return await ResponseUser.json()
    } catch (error) {
        throw new Error(String(error))
    }
}


export const LogOut = async (): Promise<boolean | authUser> => {
    try {
        const ResponseUser = await fetch('http://localhost:3000/login/logout', {
            method: 'GET',
            credentials: 'include',
        })
        console.log('LOGOUT', ResponseUser)
        return await ResponseUser.json()
    } catch (error) {
        console.error('FETCH DENTRO DE USUARIO', error)
        throw new Error(String(error))
    }
}
