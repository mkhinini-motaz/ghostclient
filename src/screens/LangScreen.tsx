import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import I18nSelect from "../components/Common/I18nSelect";
import TranslatableText from "../components/Common/TranslatableText";
import {COLOR_PRIMARY} from "../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import LangAwareView from "../components/Common/LangAwareView";

export default function LangScreen(): JSX.Element {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <LangAwareView style={{ alignItems: 'center', gap: 10, }}>
                        <Icon size={38} name={'language'} color={COLOR_PRIMARY} />
                        <TranslatableText data={'common:language'} style={styles.title} />
                    </LangAwareView>
                    <I18nSelect />
                </View>
            </View>
        </SafeAreaView>
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
        zIndex: 2,
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY,
    }
});
