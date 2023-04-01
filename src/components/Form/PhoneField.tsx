import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import TranslatableText from "../Common/TranslatableText";
import PhoneInput from "./PhoneInput";
import {COLOR_PRIMARY} from "../../constants";

interface PhoneFieldProps {
    value: string,
    label: string,
    onChange: (newValue: string|((previousValue: string) => string)) => void,
}

function PhoneField({ value, label, onChange }: PhoneFieldProps): JSX.Element {
    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={styles.label} />
            <PhoneInput
                value={value}
                onChangeText={onChange}
                style={styles.textInput}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    textInput: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
        borderColor: COLOR_PRIMARY + '88',
        borderBottomWidth: 1.5,
        borderRadius: 50,
        fontSize: 22,
    },
    label: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    },
});

export default memo(PhoneField);
