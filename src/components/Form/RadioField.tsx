import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TranslatableText from "../Common/TranslatableText";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import {useLang} from "../../store/hooks";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import LangAwareView from "../Common/LangAwareView";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import Icon from "react-native-vector-icons/AntDesign";

interface RadioFieldProps {
    value: number,
    label: string,
    options: { label: string, value: number }[],
    onChange: (newValue: number) => void,
    error: boolean,
    helperText: string,
}

function RadioField({ value, label, onChange, options, error, helperText }: RadioFieldProps): JSX.Element {
    const buttonsComponents = [];

    for (let option of options) {
        const isSelected = value === option.value;
        buttonsComponents.push(<RNBounceable onPress={() => onChange(option.value)} key={'checkbox_' + option.value} style={styles.checkboxContainer} >
            <TranslatableText data={option.label} style={styles.checkboxLabel} />
            <BouncyCheckbox disableBuiltInState
                            size={50}
                            fillColor={error ? COLOR_SECONDARY :COLOR_PRIMARY}
                            isChecked={isSelected}
                            iconComponent={!isSelected ? '' : <Icon size={38} name={'check'} color={'white'} />}
                            textContainerStyle={{ marginLeft: 0, }}
                            onPress={() => onChange(option.value)}
            />
        </RNBounceable>)
    }

    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={{ ...styles.label, marginBottom: 10 }} />
            <LangAwareView >
                {buttonsComponents}
            </LangAwareView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY,
    },
    checkboxLabel: {
        fontSize: 25,
        fontWeight: '500',
        color: '#333333',
    },
    checkboxContainer: {
        flexDirection: 'row',
        padding: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        gap: 10,
    },
    checkboxIconContainer: {
        height: 60,
        width: 60,
    },
});

export default memo(RadioField);
