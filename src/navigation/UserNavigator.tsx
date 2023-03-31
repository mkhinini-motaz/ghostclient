import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from "../screens/UserScreen";
import LoginScreen from "../screens/LoginScreen";

export default function UserNavigator(): JSX.Element {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="UserScreen" component={UserScreen} />
            {/* TODO: conditional render based on auth status */}
        </Stack.Navigator>
    );
}
