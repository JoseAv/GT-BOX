import { usersCache } from "../../shared/cache/loginUser.js"
import { comparePassword } from "../../shared/config/bcrypt/hashPassword.js"
import type { loginUser } from "../interfaces/login.js"
import { RepoLogin } from "../repositories/loginRepo.js"
import { SchemaLoginUser } from "./loginSchema.js"


export const Validationlogin = async ({ user }: { user: loginUser }) => {
    try {
        //? 3. el modelo debe de verificar elschema
        const { success } = await SchemaLoginUser({ user })
        if (!success)
            return [400, { message: 'Correo o clave incorrectos' }]

        //? 4. el modelo debe de mandar a llamar al repo despues de verificar
        const [status, userData] = await RepoLogin.login({ email: user.email })

        //? 5. El repo devuelve si encontro al user
        if (status >= 400 || !userData.data || !userData.data.password)
            return [400, { message: 'No se encontro el user' }]
        const { password, ...userWithoutPassword } = userData.data;

        //? 6. El modelo va a verificar la contrase;a
        const verifyPassword = await comparePassword(user.password, password)
        if (!verifyPassword)
            return [400, { message: 'Error en correo o password' }]

        //? 7. Mandar a Guardar en cache
        usersCache.saveUser({ user: userWithoutPassword })

        //? 9 Regresamos el nuevo JWT
        return [200, userWithoutPassword]

    } catch (error) {
        return [400, String(error)]
    }

}

