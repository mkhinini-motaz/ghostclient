import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import Icon from 'react-native-vector-icons/AntDesign';
import {COLOR_PRIMARY} from "../constants";
import {translate} from "../i18n";
import {useSelector} from "../store/hooks";

export default function MainNavigator(): JSX.Element {
    const { selectedLang } = useSelector((state) => state.I18n);
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer >
            <Tab.Navigator screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeNavigator') {
                       iconName = 'home';
                    } else if (route.name === 'CartNavigator') {
                       iconName = 'shoppingcart';
                    } else if (route.name === 'UserNavigator') {
                       iconName = 'setting';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size * 1.5} color={color} />;
                },
                tabBarActiveTintColor: COLOR_PRIMARY,
                tabBarInactiveTintColor: 'gray',
            })}
            >
                <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
                <Tab.Screen name="CartNavigator" component={CartNavigator} />
                <Tab.Screen name="UserNavigator" component={UserNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
