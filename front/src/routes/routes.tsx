import { createBrowserRouter } from "react-router";

function Root() {
    return <h1>Hello world</h1>;
}

export const router = createBrowserRouter([
    { path: "/", Component: Root },
]);


