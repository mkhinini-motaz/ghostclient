import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import MaskInput from "react-native-mask-input";
import {useLang} from "../../store/hooks";
import {phoneMask} from "../../support/utils";

interface PhoneInputProps {
    value: string,
    onChangeText: (newValue: string|((previousValue: string) => string)) => string,
    style?: TextStyle,

}

export default function PhoneInput({ value, onChangeText, style = {} }: PhoneInputProps): JSX.Element {
    const { selectedLangWriteFrom } = useLang();
    const onChangeTextCallback = useCallback((nextPhone: string) => {
        onChangeText((previousPhone: string) => {
            if (previousPhone === '+216 ' && nextPhone === '+216') {
                return '+216 ';
            }
            return nextPhone;
        });
    }, [onChangeText]);
    const phoneMaskMemo = useMemo(phoneMask, []);

    return (
        <MaskInput
            value={value}
            onChangeText={onChangeTextCallback}
            keyboardType={'phone-pad'}
            style={style}
            textAlign={selectedLangWriteFrom}
            mask={phoneMaskMemo}
            maskAutoComplete
        />
    );
};

const styles = StyleSheet.create({});
