import { createBrowserRouter } from "react-router";
import { ProtectedRouter } from "./protected";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import type { ReactNode } from "react";


function Root() {
    return <h1>Hello world</h1>;
}


const queryClient = new QueryClient()
const WrapperProvider = ({ children }: { children: ReactNode }): ReactNode => {
    return (
        <QueryClientProvider client={queryClient}>
            <ProtectedRouter>{children}</ProtectedRouter>
        </QueryClientProvider>
    )
}

export const router = createBrowserRouter([
    { path: "/", element: <WrapperProvider ><Root /></WrapperProvider> },
]);




