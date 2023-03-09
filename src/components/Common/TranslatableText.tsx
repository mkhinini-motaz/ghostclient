import React from 'react';
import { StyleSheet, Text, TextStyle, ImageStyle} from 'react-native';
import {translate} from "../../i18n";
import Translatable from "../../classes/Translatable";
import {useSelector} from "../../store/hooks";

interface TranslatableTextProps {
    data: string|Translatable;
    style?: TextStyle;
}

export default function TranslatableText(props: TranslatableTextProps): JSX.Element {
    const { selectedLangWriteFrom, selectedLang } = useSelector((state) => state.I18n);

    return (
        <Text {...props} style={{ textAlign: selectedLangWriteFrom, ...props.style }}>{translate(props.data, selectedLang)}</Text>
    );
};

const styles = StyleSheet.create({

});
