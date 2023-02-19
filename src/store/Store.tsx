import React, {useMemo, useReducer} from "react";
import {StyleSheet, View} from 'react-native';
import StoreContext from './StoreContext'
import reducer from "./reducers";
import ServiceClass from "../classes/Service";

interface StoreProps {
    children: any,
}

export default function Store({ children }: StoreProps): JSX.Element {
    const defaultState = useMemo(() => reducer(undefined, {}), []);
    const [state, dispatch] = useReducer(reducer, defaultState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

const styles = StyleSheet.create({});
