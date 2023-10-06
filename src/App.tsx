import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from "./navigation/RootNavigator";
import { QueryClient, QueryClientProvider } from 'react-query'
import Store from "./store/Store";

const queryClient = new QueryClient();

export default function App(): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Store>
                <RootNavigator />
            </Store>
        </QueryClientProvider>
    );
}
