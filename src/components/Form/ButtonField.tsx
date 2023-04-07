import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import {COLOR_PRIMARY} from "../../constants";
import TranslatableText from "../Common/TranslatableText";
import {capitalize} from "../../support/utils";

interface ButtonFieldProps {
    label: string,
    isLoading?: boolean,
    onPress?: () => void,
    buttonType?: 'contained'|'outlined',
}

function ButtonField({ label, isLoading, onPress, buttonType = 'contained' }: ButtonFieldProps): JSX.Element {
    return (
        <RNBounceable onPress={onPress} >
            {isLoading ?
                <ActivityIndicator size="large" color={COLOR_PRIMARY} animating={isLoading} /> :
                <View style={styles['button' + capitalize(buttonType)]}>
                    <TranslatableText style={styles['buttonText' + capitalize(buttonType)]} data={label} />
                </View>
            }
        </RNBounceable>
    );
};

const buttonStyle = {
    borderRadius: 20,
    padding: 10,
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 4,
};

const styles = StyleSheet.create({
    buttonOutlined: {
        ...buttonStyle,
        borderColor: COLOR_PRIMARY,
        backgroundColor: 'white',
        borderWidth: 0.18,
    },
    buttonContained: {
        ...buttonStyle,
        backgroundColor: COLOR_PRIMARY,
    },
    buttonTextOutlined: {
        fontSize: 19,
        fontWeight: '700',
        textAlign: 'center',
        color: COLOR_PRIMARY,
    },
    buttonTextContained: {
        fontSize: 19,
        fontWeight: '700',
        textAlign: 'center',
        color: 'white',
    },
});

export default memo(ButtonField);
