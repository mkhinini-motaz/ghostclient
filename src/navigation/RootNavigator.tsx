import React from 'react';
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import {useClient} from "../store/hooks";
import LoginNavigator from "./LoginNavigator";
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar, View} from "react-native";
import NoInternetConnexionIndicator from "../components/Common/NoInternetConnexionIndicator";

export default function RootNavigator(): JSX.Element {
    const client = useClient();

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} backgroundColor="white" />
            <NoInternetConnexionIndicator />
            <NavigationContainer >{
                !!client.id ?
                    <AuthenticatedNavigator/> :
                    <LoginNavigator/>
            }</NavigationContainer>
        </View>
    );
}
