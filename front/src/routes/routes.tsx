import { createBrowserRouter } from "react-router";
import { ProtectedRouter } from "./protected";
import { Login } from "../features/login/pages/LoginPages";
import { Layout } from "@/features/layout/Layout";


function Root() {
    return <h1>Hello world</h1>;
}

export const router = createBrowserRouter([
    {
        element: (<ProtectedRouter />),
        children: [{ path: '/', Component: Root }]
    }, {
        path: "/login",
        // element: Login()
        element: Layout(<h1>hola</h1>)
    }
]);




