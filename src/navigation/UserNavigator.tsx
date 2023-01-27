import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from "../screens/UserScreen";

export default function UserNavigator(): JSX.Element {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="UserScreen" component={UserScreen} />
        </Stack.Navigator>
    );
}
