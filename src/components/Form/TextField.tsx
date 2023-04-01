import React, {memo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import TranslatableText from "../Common/TranslatableText";
import {COLOR_PRIMARY} from "../../constants";
import {useLang} from "../../store/hooks";

interface TextFieldProps {
    value: string,
    label: string,
    onChange: (newValue: string) => void,
}

function TextField({ value, label, onChange }: TextFieldProps): JSX.Element {
    const { selectedLangWriteFrom } = useLang();

    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={styles.label} />
            <TextInput
                value={value}
                onChangeText={onChange}
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

export default memo(TextField);
