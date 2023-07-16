import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from "../screens/UserScreen";
import LoyaltyScreen from "../screens/LoyaltyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditPasswordScreen from "../screens/EditPasswordScreen";

export default function UserNavigator(): JSX.Element {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerTitle: '' }}>
            <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoyaltyScreen" component={LoyaltyScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditPasswordScreen" component={EditPasswordScreen} />
        </Stack.Navigator>
    );
}
