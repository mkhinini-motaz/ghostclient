import React, { useReducer } from "react";
import {StyleSheet, View} from 'react-native';
import StoreContext from './StoreContext'
import reducer from "./reducers";

interface StoreProps {
    children: any,
}

export default function Store({ children }: StoreProps): JSX.Element {
    const [state, dispatch] = useReducer(reducer, reducer(undefined, {}));

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

const styles = StyleSheet.create({});
