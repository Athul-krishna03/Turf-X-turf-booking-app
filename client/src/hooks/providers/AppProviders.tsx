import { StrictMode } from "react";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import {store} from "../../store/store"



const queryClient = new QueryClient();

export function AppProviders({children}:{children:React.ReactNode}){
    return (
        <StrictMode>
            <Provider store={store} >
            <QueryClientProvider client={queryClient}>
                <Toaster/>
                {children}
            </QueryClientProvider>
            </Provider>
        </StrictMode>
    )
}