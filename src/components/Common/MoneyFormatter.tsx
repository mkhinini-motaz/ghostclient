import React from 'react';
import {StyleSheet, View, Text, TextStyle} from 'react-native';
import {LOCAL, LOCAL_CURRENCY} from "../../constants";
import {translate} from "../../i18n";

interface MoneyFormatterProps {
    data: number,
    style: TextStyle,
}

export default function MoneyFormatter({ data, style }: MoneyFormatterProps): JSX.Element {
    const formatter = new Intl.NumberFormat(LOCAL, {
        style: 'currency',
        currency: LOCAL_CURRENCY,
    });

    return (
        <Text style={style}>
            {formatter.format(data / 1000).replace(LOCAL_CURRENCY, '') + ' ' +
            translate(LOCAL_CURRENCY, 'fr', true)}
        </Text>
    );
};

const styles = StyleSheet.create({});
