import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import I18nSelect from "../components/Common/I18nSelect";
import TranslatableText from "../components/Common/TranslatableText";
import {COLOR_PRIMARY} from "../constants";

export default function UserScreen(): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TranslatableText data={'common:profile'} style={styles.title} />
            </View>
            <View style={styles.card}>
                <TranslatableText data={'common:orders'} style={styles.title} />
            </View>
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
        gap: 10,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    }
});
