import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRouter } from "./protected";
import { Login } from "../features/login/pages/LoginPages";
import { Layout } from "@/features/layout/Layout";
import { PageUsers } from "@/features/user/page/main";
import { CreateUserPage } from "@/features/user/page/CreateUserPage";
import { UpdateUserPage } from "@/features/user/page/UpdateUserPage";
import { MainProducts } from "@/features/products/pages/Main";
import { CreateProducts } from "@/features/products/pages/Create";
import { UpdateProductsPage } from "@/features/products/pages/Edit";
import { MainAttribute } from "@/features/attributes/pages/Main";
import { CreateAttributePage } from "@/features/attributes/pages/Create";
import { EditAttributePage } from "@/features/attributes/pages/Edit";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRouter />,
        children: [{
            element: <Layout />,
            children: [
                { index: true, element: <Navigate to='/dashboard' replace /> },

                { path: 'user', element: <PageUsers /> },
                { path: 'user/create', element: < CreateUserPage /> },
                { path: 'user/edit/:id', element: < UpdateUserPage /> },

                { path: 'dashboard' },

                { path: 'products', element: < MainProducts /> },
                { path: 'products/create', element: < CreateProducts /> },
                { path: 'products/edit/:id', element: < UpdateProductsPage /> },

                { path: 'attributes', element: <MainAttribute /> },
                { path: 'attributes/create', element: <CreateAttributePage /> },
                { path: 'attributes/edit/:id', element: <EditAttributePage /> },

                { path: '*', element: <Navigate to='/dashboard' replace /> }

            ]
        }],
    }, {
        path: "/login",
        element: <Login />
    }
]);




