import type { ReactNode } from "react";
import { InfoUser } from "../shared/auth/hooks/InfoUser";
import { Navigate, Outlet } from "react-router";

export const ProtectedRouter = (): ReactNode => {

    const query = InfoUser()
    if (query.isPending) {
        return <h1>Cargando</h1>
    }

    if (query.error) {
        return <h1>Error en la llamada a user</h1>
    }

    if (!query.data)
        return <Navigate to='/login' replace />

    return <Outlet />

}