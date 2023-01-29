import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {LOCAL, LOCAL_CURRENCY} from "../../constants";
import {translate} from "../../i18n";

interface MoneyFormatterProps {
    data: number,
}

export default function MoneyFormatter({ data }: MoneyFormatterProps): JSX.Element {
    const formatter = new Intl.NumberFormat(LOCAL, {
        style: 'currency',
        currency: LOCAL_CURRENCY,
    });

    return (
        <Text>
            {formatter.format(data / 1000).replace(LOCAL_CURRENCY, '') + ' ' +
            translate(LOCAL_CURRENCY, 'fr', true)}
        </Text>
    );
};

const styles = StyleSheet.create({});
