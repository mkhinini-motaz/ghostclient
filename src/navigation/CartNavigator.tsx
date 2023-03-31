import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from "../screens/CartScreen";

export default function CartNavigator(): JSX.Element {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
    );
}
