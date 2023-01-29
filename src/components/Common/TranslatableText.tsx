import React from 'react';
import { StyleSheet, Text, TextStyle, ImageStyle} from 'react-native';
import {translate} from "../../i18n";
import Translatable from "../../classes/Translatable";

interface TranslatableTextProps {
    data: string|Translatable;
    style?: TextStyle;
}

export default function TranslatableText({ style, data }: TranslatableTextProps): JSX.Element {
    return (
        <Text style={style}>{translate(data, 'tnfr')}</Text>
    );
};

const styles = StyleSheet.create({

});
