import React, {useEffect} from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import ShopListScreen from "../screens/ShopListScreen";
import ShopScreen from "../screens/ShopScreen";
import ProductWithOptionsScreen from "../screens/ProductWithOptionsScreen";
import {SafeAreaView} from "react-native";

export default function HomeNavigator({ navigation }): JSX.Element {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ShopList" component={ShopListScreen} />
            <Stack.Screen name="Shop" component={ShopScreen} />
            <Stack.Screen name="ProductWithOptions" component={ProductWithOptionsScreen} />
        </Stack.Navigator>
    );
}
