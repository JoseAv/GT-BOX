import { createBrowserRouter } from "react-router";
import { ProtectedRouter } from "./protected";
import { Login } from "../features/login/pages/LoginPages";
import { Layout } from "@/features/layout/Layout";



export const router = createBrowserRouter([
    {
        path: '/',
        element: (<ProtectedRouter />),
        children: [{
            element: <Layout />,
            children: [{ path: 'dashboard', element: <Login /> }]
        }]
    }, {
        path: "/login",
        element: Login()
    }
]);




