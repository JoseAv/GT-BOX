import type { loginUser } from "../interfaces/login.js"
import { RepoLogin } from "../repositories/loginRepo.js"
import { SchemaLoginUser } from "./loginSchema.js"


export const Validationlogin = async ({ user }: { user: loginUser }) => {
    try {

        //? 3. el modelo debe de verificar elschema
        const { success, data } = await SchemaLoginUser({ user })
        if (!success)
            return [400, { message: 'Correo o clave incorrectos' }]

        //? 4. el modelo debe de mandar a llamar al repo despues de verificar
        const [status, loginUser] = await RepoLogin.login({ email: user.email })

        //? 5. El repo devuelve si encontro al user
        if (status >= 400)
            return [400, { message: 'No se encontro el user' }]


        //? 6. El modelo va a verificar la contrase;a



        //? 7 el modelo me va a regresar la informacion ya con el jwt
        //? 8 depende del status tomamos decicion


    } catch (error) {
        return [400, String(error)]
    }

}
