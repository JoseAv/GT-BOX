import { createBrowserRouter } from "react-router";
import { ProtectedRouter } from "./protected";
import { Login } from "../features/login/pages/LoginPages";
import { Layout } from "@/features/layout/Layout";
import { PageUsers } from "@/features/user/page/main";
import { CreateUserPage } from "@/features/user/page/CreateUserPage";
import { UpdateUserPage } from "@/features/user/page/UpdateUserPage";



export const router = createBrowserRouter([
    {
        path: '/',
        element: (<ProtectedRouter />),
        children: [{
            element: <Layout />,
            children: [
                { path: 'user', element: <PageUsers /> },
                { path: 'user/create', element: < CreateUserPage /> },
                { path: 'user/edit', element: < UpdateUserPage /> },


            ]
        }]
    }, {
        path: "/login",
        element: Login()
    }
]);




