import { createBrowserRouter } from "react-router";
import { ProtectedRouter } from "./protected";
import { Login } from "../features/login/pages/LoginPages";
import { Layout } from "@/features/layout/Layout";
import { PageUsers } from "@/features/user/page/main";
import { CreateUser } from "@/features/user/page/createUser";



export const router = createBrowserRouter([
    {
        path: '/',
        element: (<ProtectedRouter />),
        children: [{
            element: <Layout />,
            children: [{ path: 'user', element: <PageUsers /> }, { path: 'user/create', element: < CreateUser /> }]
        }]
    }, {
        path: "/login",
        element: Login()
    }
]);




