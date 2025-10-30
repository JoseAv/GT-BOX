import { createBrowserRouter } from "react-router";
import { ProtectedRouter } from "./protected";
import { Login } from "../features/login/pages/LoginPages";
import { Layout } from "@/features/layout/Layout";
import { PageUsers } from "@/features/user/page/main";



export const router = createBrowserRouter([
    {
        path: '/',
        element: (<ProtectedRouter />),
        children: [{
            element: <Layout />,
            children: [{ path: 'dashboard', element: <PageUsers /> }]
        }]
    }, {
        path: "/login",
        element: Login()
    }
]);




