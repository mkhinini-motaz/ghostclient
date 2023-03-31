import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import Icon from 'react-native-vector-icons/AntDesign';
import { COLOR_PRIMARY } from "../constants";
import TabBar from "../components/Common/TabBar";

export default function AuthenticatedNavigator(): JSX.Element {
    const Tab = createBottomTabNavigator();

    return (
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
            tabBarOptions: {
                activeTintColor: COLOR_PRIMARY,
                inactiveTintColor: "gray",
            },
        })}
           tabBar={props => <TabBar {...props} />}
        >
            <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
            <Tab.Screen name="CartNavigator" component={CartNavigator} />
            <Tab.Screen name="UserNavigator" component={UserNavigator} />
        </Tab.Navigator>
    );
}
