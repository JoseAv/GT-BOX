import type { userCreate, ValidationError } from "../interfaces/user.js";
import { db } from '../../config/db/sequelize.js'
import { QueryTypes } from "sequelize";
import type { GenericSpResponse, responseSuccessDB } from "../../shared/interfaces/DB.js";
import { string } from "zod";


export class userRepo {

    static dbCreateUser = async ({ user }: { user: userCreate }): Promise<ValidationError> => {

        try {

            const queryCreateUser: GenericSpResponse[] = await db.query('select sp_create_user (:sp_first_name,:sp_second_name,:sp_first_last_name,:sp_password,:sp_user_name,:sp_email,:sp_date_of_birth)',
                {
                    replacements: {
                        sp_first_name: user.first_name,
                        sp_second_name: user.second_name,
                        sp_first_last_name: user.first_last_name,
                        sp_password: user.password,
                        sp_user_name: user.user_name,
                        sp_email: user.email,
                        sp_date_of_birth: user.date_of_birth
                    },
                    type: QueryTypes.SELECT
                })



            const resultObject = queryCreateUser?.[0];
            const sp_name = resultObject ? Object.keys(resultObject)[0] : undefined;
            const responseDb = sp_name ? resultObject ? resultObject[sp_name] : undefined : undefined


            if (!responseDb) {
                return [400, { message: 'La base de datos no devolvió una respuesta.' }]
            }

            return [responseDb.http_code, { ...responseDb }]

        } catch (error) {
            return [400, { message: String(error) }]

        }

    }





}