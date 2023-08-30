import React, {useEffect} from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import ShopListScreen from "../screens/ShopListScreen";
import ShopScreen from "../screens/ShopScreen";
import ProductWithOptionsScreen from "../screens/ProductWithOptionsScreen";
import {COLOR_SECONDARY} from "../constants";

export default function HomeNavigator({ }): JSX.Element {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerTitle: '',
            headerTintColor: COLOR_SECONDARY,
        }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ShopList" component={ShopListScreen} />
            <Stack.Screen name="Shop" component={ShopScreen} />
            <Stack.Screen name="ProductWithOptions" component={ProductWithOptionsScreen} />
        </Stack.Navigator>
    );
}
