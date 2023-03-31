import React from 'react';
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import {useClient} from "../store/hooks";
import LoginNavigator from "./LoginNavigator";
import { NavigationContainer } from '@react-navigation/native';

export default function RootNavigator(): JSX.Element {
    const client = useClient();
    // TODO: auth logic

    return (
        <NavigationContainer >{
            !!client.id ?
                <AuthenticatedNavigator/> :
                <LoginNavigator/>
        }</NavigationContainer>
    );
}
