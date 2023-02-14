import React from 'react';
import MainNavigator from "./navigation/MainNavigator";
import { QueryClient, QueryClientProvider } from 'react-query'
import Store from "./store/Store";

const queryClient = new QueryClient();

export default function App(): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Store>
                <MainNavigator />
            </Store>
        </QueryClientProvider>
    );
}
