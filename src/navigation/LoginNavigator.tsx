import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OtpScreen from "../screens/OtpScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";

export default function LoginNavigator(): JSX.Element {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerTitle: '', headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}
