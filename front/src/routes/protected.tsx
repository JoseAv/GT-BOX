import type { ReactNode } from "react";
import { InfoUser } from "../shared/auth/hooks/InfoUser";

export const ProtectedRouter = ({ children }: { children: ReactNode }): ReactNode => {

    const query = InfoUser()
    if (query.isPending) {
        return <h1>Cargando</h1>
    }

    if (query.error) {
        return <h1>Error en la llamada a user</h1>
    }

    if (!query.data)
        return <h1>usuario no autenticado</h1>

    return children

}