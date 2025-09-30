import QueryTypes from "sequelize/lib/query-types"
import { db } from "../../shared/config/db/sequelize.js"
import type { ResultDB } from "../../shared/interfaces/DB.js"
import type { ValidationLogin } from "../interfaces/login.js"

export class RepoLogin {

    static login = async ({ email }: { email: string }): Promise<ValidationLogin> => {
        try {

            const queryLogin: Array<ResultDB> = await db.query('SELECT (loginUser(:user_mail)) as result;',
                {
                    replacements: {
                        user_mail: email
                    },
                    type: QueryTypes.SELECT
                }
            )
            if (!queryLogin || queryLogin.length === 0 || !queryLogin[0])
                return [400, { message: 'Empty Data to show' }]

            const responseDb = queryLogin[0].result
            return [responseDb.http_code, { ...responseDb }]


        } catch (error) {
            return [400, { message: String(error) }]

        }
    }


    static async refreshUser({ userId }: { userId: number }) {
        try {
            const queryRefresh: Array<ResultDB> = await db.query('SELECT (fn_refresh_user(:userId)) as result;',
                {
                    replacements: {
                        userId: userId
                    },
                    type: QueryTypes.SELECT
                }
            )
            if (!queryRefresh || queryRefresh.length === 0 || !queryRefresh[0])
                return [400, { message: 'Empty Data to show' }]
            console.log(queryRefresh)
            const responseDb = queryRefresh[0].result
            return [responseDb.http_code, { ...responseDb }]
        } catch (error) {
            return [400, { message: String(error) }]

        }

    }
}
