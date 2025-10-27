import type { ReactNode } from "react";
import { InfoUser } from "../shared/auth/hooks/InfoUser";
import { Navigate, Outlet } from "react-router";

export const ProtectedRouter = (): ReactNode => {
    const query = InfoUser()
    if (query.isPending) {
        return <h1>Cargando</h1>
    }

    if (query.error || !query.data) {
        return <Navigate to="/login" replace />
    }

    if (!query.data)
        return <Navigate to='/login' replace />

    return <Outlet />

}