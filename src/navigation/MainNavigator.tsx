import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";

export default function MainNavigator(): JSX.Element {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer >
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
                <Tab.Screen name="CartNavigator" component={CartNavigator} />
                <Tab.Screen name="UserNavigator" component={UserNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
