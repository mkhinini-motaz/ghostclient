import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import I18nSelect from "../components/Common/I18nSelect";
import TranslatableText from "../components/Common/TranslatableText";
import {COLOR_PRIMARY} from "../constants";

export default function UserScreen(): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TranslatableText data={'common:language'} style={styles.title} />
                <I18nSelect />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        gap: 10
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    }
});
