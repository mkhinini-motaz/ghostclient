import React from 'react';
import {useClient} from "../store/hooks";
import LoginNavigator from "./LoginNavigator";
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar, View} from "react-native";
import HomeNavigator from "./HomeNavigator";

export default function RootNavigator(): JSX.Element {
    const client = useClient();

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} backgroundColor="white" />
            <NavigationContainer >{
                !!client.id ?
                    <HomeNavigator/> :
                    <LoginNavigator/>
            }</NavigationContainer>
        </View>
    );
}
