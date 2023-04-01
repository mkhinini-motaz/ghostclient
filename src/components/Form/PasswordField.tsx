import React, {memo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import TranslatableText from "../Common/TranslatableText";
import {useLang} from "../../store/hooks";
import {COLOR_PRIMARY} from "../../constants";

interface PasswordFieldProps {
    value: string,
    label: string,
    onChange: (newValue: string) => void
}

function PasswordField({ value, label, onChange }: PasswordFieldProps): JSX.Element {
    const { selectedLangWriteFrom } = useLang();

    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={styles.label} />
            <TextInput
                value={value}
                onChangeText={onChange}
                secureTextEntry
                style={styles.textInput}
                textAlign={selectedLangWriteFrom}
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

export default memo(PasswordField);
