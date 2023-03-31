import React, {useCallback} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import I18nSelect from "../components/Common/I18nSelect";
import TranslatableText from "../components/Common/TranslatableText";
import {COLOR_PRIMARY} from "../constants";
import RNBounceable from "@freakycoder/react-native-bounceable";
import {useSetClient} from "../store/hooks";
import {setClientToken} from "../support/auth";

export default function UserScreen({ navigation }): JSX.Element {
    const setClient = useSetClient();
    const onProfilePress = useCallback(() => {
        // TODO: navigate to profile
        console.log('profile clicked')
    }, []);

    const onLogoutPress = useCallback(() => {
        setClientToken('').then(() => setClient({}));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <RNBounceable onPress={onProfilePress}>
                <View style={styles.card}>
                    <TranslatableText data={'common:profile'} style={styles.title} />
                </View>
            </RNBounceable>
            <RNBounceable onPress={onLogoutPress}>
                <View style={styles.card}>
                    <TranslatableText data={'common:logout'} style={styles.title} />
                </View>
            </RNBounceable>
            <View style={styles.card}>
                <TranslatableText data={'common:language'} style={styles.title} />
                <I18nSelect />
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
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    }
});
