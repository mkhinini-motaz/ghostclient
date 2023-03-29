import React, {useMemo, useReducer, useState} from "react";
import {StyleSheet, View} from 'react-native';
import StoreContext from './StoreContext'
import I18nContext from './I18nContext'
import reducer from "./reducers";
import ServiceClass from "../classes/Service";
import {defaultLang} from "../i18n";

interface StoreProps {
    children: any,
}

export default function Store({ children }: StoreProps): JSX.Element {
    const defaultState = useMemo(() => reducer(undefined, {}), []);
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [lang, setLang] = useState(defaultLang.code);

    return (
        <I18nContext.Provider value={{ lang, setLang }}>
            <StoreContext.Provider value={{ state, dispatch }}>
                {children}
            </StoreContext.Provider>
        </I18nContext.Provider>
    );
};

const styles = StyleSheet.create({});
