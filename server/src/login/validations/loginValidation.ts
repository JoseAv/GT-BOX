import { comparePassword } from "../../shared/config/bcrypt/hashPassword.js"
import { signToken } from "../../shared/config/jwt/JWT.js"
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

        console.log(userWithoutPassword)
        //? 7 el modelo me va a regresar la informacion ya con el jwt
        const jwt = await signToken({ user: userWithoutPassword })

        //? 8 Regresamos el nuevo JWT
        return [200, jwt]


    } catch (error) {
        return [400, String(error)]
    }

}
