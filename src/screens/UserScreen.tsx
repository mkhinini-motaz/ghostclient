import React, {useCallback} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import I18nSelect from "../components/Common/I18nSelect";
import TranslatableText from "../components/Common/TranslatableText";
import {COLOR_PRIMARY} from "../constants";
import RNBounceable from "@freakycoder/react-native-bounceable";
import {useClient, useSetClient} from "../store/hooks";
import {setClientToken} from "../support/auth";
import Icon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import LangAwareView from "../components/Common/LangAwareView";
import {GENDER_FEMALE} from "../classes/Client";

export default function UserScreen({ navigation }): JSX.Element {
    const setClient = useSetClient();
    const client = useClient();
    const onProfilePress = useCallback(() => {
        // TODO: navigate to profile
        console.log('profile clicked')
    }, []);

    const onLoyaltyPress = useCallback(() => {
        navigation.navigate('LoyaltyScreen');
    }, []);


    const onLogoutPress = useCallback(() => {
        setClientToken('').then(() => setClient({}));
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <RNBounceable onPress={onProfilePress}>
                    <LangAwareView style={{ ...styles.card, alignItems: 'center', }}>
                        <SimpleLineIcon size={38} name={client.gender === GENDER_FEMALE ? 'user-female' : 'user'} color={COLOR_PRIMARY} />
                        <TranslatableText data={'common:profile'} style={styles.title} />
                    </LangAwareView>
                </RNBounceable>
                <RNBounceable onPress={onLoyaltyPress}>
                    <LangAwareView style={{ ...styles.card, alignItems: 'center', }}>
                        <Icon size={38} name={'loyalty'} color={COLOR_PRIMARY} />
                        <TranslatableText data={'common:loyalty_program'} style={styles.title} />
                    </LangAwareView>
                </RNBounceable>
                <RNBounceable onPress={onLogoutPress}>
                    <LangAwareView style={{ ...styles.card, alignItems: 'center', }}>
                        <Icon size={38} name={'logout'} color={COLOR_PRIMARY} />
                        <TranslatableText data={'common:logout'} style={styles.title} />
                    </LangAwareView>
                </RNBounceable>
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
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY,
    }
});
