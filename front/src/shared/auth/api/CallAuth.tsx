import type { authUser } from "../interfaces/Auth"

export const CallAuth = async (): Promise<boolean | authUser> => {
    try {
        const ResponseUser = await fetch('http://localhost:3000/login/auth/me', {
            method: 'GET',
            credentials: 'include'
        })
        const user = ResponseUser.json()
        return user
    } catch (error) {
        console.log('FETCH DENTRO DE USUARIO', error)
        return false
    }
}


export const PruebaUserCookie = async (): Promise<boolean | authUser> => {
    const data = {
        email: "miguel@gmail.com",
        password: "jose123"
    }
    try {
        const ResponseUser = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'CONTENT-TYPE': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (!ResponseUser.ok)
            return false

        const user = ResponseUser.json()
        return user
    } catch (error) {
        console.log('FETCH DENTRO DE USUARIO', error)
        return false
    }
}


export const LogOut = async (): Promise<boolean | authUser> => {
    try {
        const ResponseUser = await fetch('http://localhost:3000/login/logout', {
            method: 'GET',
            credentials: 'include',
        })
        console.log('LOGOUT', ResponseUser)
        return false
    } catch (error) {
        console.log('FETCH DENTRO DE USUARIO', error)
        return false
    }
}
