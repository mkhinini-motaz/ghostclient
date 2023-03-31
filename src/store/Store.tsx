import React, {useEffect, useMemo, useReducer, useState} from "react";
import {StyleSheet, View} from 'react-native';
import StoreContext from './context/StoreContext'
import I18nContext from './context/I18nContext'
import AuthContext from './context/AuthContext'
import reducer from "./reducers";
import ServiceClass from "../classes/Service";
import {defaultLang} from "../i18n";
import {profile} from "../api/auth";
import {getClientToken} from "../support/auth";

interface StoreProps {
    children: any,
}

export default function Store({ children }: StoreProps): JSX.Element {
    const defaultState = useMemo(() => reducer(undefined, {}), []);
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [lang, setLang] = useState(defaultLang.code);
    const [client, setClient] = useState({});

    useEffect(() => {
        profile().then(setClient);
    }, []);

    return (
        <I18nContext.Provider value={{ lang, setLang }}>
            <AuthContext.Provider value={{ client, setClient }}>
                <StoreContext.Provider value={{ state, dispatch }}>
                    {children}
                </StoreContext.Provider>
            </AuthContext.Provider>
        </I18nContext.Provider>
    );
};

const styles = StyleSheet.create({});
