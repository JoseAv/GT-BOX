import type { typeUser, userCreate, ValidationError } from "../interfaces/user.js";

import { QueryTypes } from "sequelize";
import type { GenericSpResponse, ResultDB } from "../../shared/interfaces/DB.js";
import { db } from "../../shared/config/db/sequelize.js";
import { boolean } from "zod";


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


    static getAllUser = async (): Promise<ValidationError> => {
        try {

            const queryGetAllUser: Array<ResultDB> = await db.query('SELECT (fn_get_all_users()) as result;', { type: QueryTypes.SELECT })
            if (!queryGetAllUser || queryGetAllUser.length === 0 || !queryGetAllUser[0])
                return [400, { message: 'Empty Data to show' }]

            const responseDb = queryGetAllUser[0].result

            return [responseDb.http_code, { ...responseDb }]


        } catch (error) {
            return [400, { message: String(error) }]

        }
    }

    static dbUpdateUser = async ({ user }: { user: typeUser }): Promise<ValidationError> => {
        const userActive = typeof user.is_active !== 'boolean' ? null : user.is_active
        try {
            const queryUpdateUser: Array<ResultDB> = await db.query('select fn_update_user(:sp_id, :sp_first_name,:sp_second_name,:sp_first_last_name,:sp_password,:sp_user_name,:sp_email,:sp_date_of_birth,:f_is_active) as result',
                {
                    replacements: {
                        sp_id: user.id,
                        sp_first_name: user.first_name || null,
                        sp_second_name: user.second_name || null,
                        sp_first_last_name: user.first_last_name || null,
                        sp_password: user.password || null,
                        sp_user_name: user.user_name || null,
                        sp_email: user.email || null,
                        sp_date_of_birth: user.date_of_birth || null,
                        f_is_active: userActive
                    },
                    type: QueryTypes.SELECT
                })

            if (!queryUpdateUser || queryUpdateUser.length === 0 || !queryUpdateUser[0])
                return [400, { message: 'Empty Data to show' }]

            const responseDb = queryUpdateUser[0].result
            return [responseDb.http_code, { ...responseDb }]
        } catch (error) {
            return [400, { message: String(error) }]
        }
    }


}