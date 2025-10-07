import { createBrowserRouter } from "react-router";
import { ProtectedRouter } from "./protected";


function Root() {
    return <h1>Hello world</h1>;
}

function login() {
    return <h1>Hello Login</h1>;
}

export const router = createBrowserRouter([
    {
        element: (<ProtectedRouter />),
        children: [{ path: '/', Component: Root }]
    }, {
        path: "/login",
        element: login()
    }
]);




