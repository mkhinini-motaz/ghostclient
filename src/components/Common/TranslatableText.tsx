import React, {memo} from 'react';
import { StyleSheet, Text, TextStyle, ImageStyle} from 'react-native';
import {translate} from "../../i18n";
import Translatable from "../../classes/Translatable";
import {useLang, useSelector} from "../../store/hooks";

interface TranslatableTextProps {
    data: string|Translatable;
    style?: TextStyle;
}

function TranslatableText(props: TranslatableTextProps): JSX.Element {
    const { selectedLangWriteFrom, selectedLang } = useLang();

    return (
        <Text {...props} style={{ textAlign: selectedLangWriteFrom, ...props.style }}>{translate(props.data, selectedLang)}</Text>
    );
};

const styles = StyleSheet.create({

});

export default memo(TranslatableText);
