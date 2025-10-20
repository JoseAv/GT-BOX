import { createBrowserRouter } from "react-router";
import { ProtectedRouter } from "./protected";
import { Login } from "../features/login/pages/LoginPages";


function Root() {
    return <h1>Hello world</h1>;
}



export const router = createBrowserRouter([
    {
        element: (<ProtectedRouter />),
        children: [{ path: '/', Component: Root }]
    }, {
        path: "/login",
        element: Login()
    }
]);




