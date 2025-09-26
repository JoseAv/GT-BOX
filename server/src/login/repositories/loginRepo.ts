import QueryTypes from "sequelize/lib/query-types"
import { db } from "../../shared/config/db/sequelize.js"
import type { ResultDB } from "../../shared/interfaces/DB.js"
import type { ValidationError } from "../../user/interfaces/user.js"

export class RepoLogin {

    static login = async ({ email }: { email: string }): Promise<ValidationError> => {
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




}
