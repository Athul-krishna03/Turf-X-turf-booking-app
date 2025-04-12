import { StrictMode } from "react";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";



const queryClient = new QueryClient();

export function AppProviders({children}:{children:React.ReactNode}){
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Toaster/>
                {children}
            </QueryClientProvider>
        </StrictMode>
    )
}