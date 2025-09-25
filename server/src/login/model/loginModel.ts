import type { loginUser } from "../interfaces/login.js";
import { SchemaLoginUser } from "../validations/loginSchema.js";

export class loginModel {


    static async login({ user }: { user: loginUser }) {
        try {

            //? 3. el modelo debe de verificar elschema
            const verifySchema = SchemaLoginUser({ user })
            //? 4. el modelo debe de mandar a llamar al repo despues de verificar
            //? 5. El repo devuelve si encontro al user
            //? 6. El modelo va a verificar la contrase;a
            //? 7 el modelo me va a regresar la informacion ya con el jwt
            //? 8 depende del status tomamos decicion


        } catch (error) {
            return [400, String(error)]
        }

    }



}