import type { userCreate, ValidationError } from "../interfaces/user.js";
import { db } from '../../config/db/sequelize.js'
class userRepo {


    static dbCreateUser = async ({ user }: { user: userCreate }): Promise<ValidationError> => {

        try {

            db.query("",
                {

                })


            return [2343, { message: 'Creado con exito Usuario' }]

        } catch (error) {
            return [2343, { message: String(error) }]

        }

    }





}