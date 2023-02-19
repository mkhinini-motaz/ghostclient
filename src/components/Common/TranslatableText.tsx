import React from 'react';
import { StyleSheet, Text, TextStyle, ImageStyle} from 'react-native';
import {translate} from "../../i18n";
import Translatable from "../../classes/Translatable";
import {useSelector} from "../../store/hooks";

interface TranslatableTextProps {
    data: string|Translatable;
    style?: TextStyle;
}

export default function TranslatableText({ style, data }: TranslatableTextProps): JSX.Element {
    const selectedLang = useSelector((state) => state.I18n.selectedLang);

    return (
        <Text style={style}>{translate(data, selectedLang)}</Text>
    );
};

const styles = StyleSheet.create({

});
