import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {translate} from "../../i18n";
import OptionClass from "../../classes/Option";
import {useLang} from "../../store/hooks";
import {formatMoneyDisplay} from "../../support/utils";

interface OptionProps {
    data: OptionClass
}

function Option({ data }: OptionProps): JSX.Element {
    const { selectedLang, selectedLangWriteFrom } = useLang();

    let optionOutput = translate(data.name, selectedLang);
    if (data.quantity) {
        optionOutput += ' ' + '+'.repeat(data.quantity);
    }
    if (data.price) {
        optionOutput += ' (+' + formatMoneyDisplay(data.price, selectedLang, selectedLangWriteFrom) + ')';
    }

    return (
        <View>
            <Text style={styles.text}>{optionOutput}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
    },
});

export default memo(Option);
