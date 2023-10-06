import React, {useEffect} from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopListScreen from "../screens/ShopListScreen";
import ShopScreen from "../screens/ShopScreen";
import ProductWithOptionsScreen from "../screens/ProductWithOptionsScreen";
import {COLOR_SECONDARY} from "../constants";
import ProductListScreen from "../screens/ProductListScreen";
import DrawerNavigator from "./DrawerNavigator";
import LocationShowMapScreen from "../screens/LocationShowMapScreen";

export default function HomeNavigator({ }): JSX.Element {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerTitle: '',
            headerTintColor: COLOR_SECONDARY,
        }}>
            <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ShopList" component={ShopListScreen} options={{ headerBackTitleVisible: false }} />
            <Stack.Screen name="Shop" component={ShopScreen} options={{ headerBackTitleVisible: false }} />
            <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerBackTitleVisible: false }} />
            <Stack.Screen name="ProductWithOptions" component={ProductWithOptionsScreen} options={{ headerBackTitleVisible: false }} />
            <Stack.Screen name="LocationShowMap" component={LocationShowMapScreen} options={{ headerBackTitleVisible: false }} />

        </Stack.Navigator>
    );
}
