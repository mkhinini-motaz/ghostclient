import React from 'react';
import {ActivityIndicator, Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import ShopList from "../components/Shop/ShopList";
import ServiceClass from "../classes/Service";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../constants";
import TranslatableText from "../components/Common/TranslatableText";
import {translate} from "../i18n";
import {useAuthenticateClient, useLang, useSetClient} from "../store/hooks";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import Image from "../components/Common/Image";
import Logo from "../components/Common/Logo";
import {useMutation} from "react-query";
import { login } from "../api/auth";
import Client from "../classes/Client";

interface LoginScreenProps {
    navigation: any,
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [phone, setPhone] = React.useState('+21628852800');
    const [password, setPassword] = React.useState('moniabohlel');
    const { selectedLang, selectedLangWriteFrom } = useLang();
    const authenticateClient = useAuthenticateClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: login,
        onSuccess: authenticateClient,
        onError: (error) => {
            Alert.alert(
                '',
                translate('login:error', selectedLang),
                [{ text: translate('common:ok', selectedLang), }],
            );
        }
    });
    const onLoginPress = () => mutate({ phone, password });

    return (
        <View style={styles.container}>
            <Logo />

            <View style={styles.section}>
                <TranslatableText data={"form:phone:label"} style={styles.label} />
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType={'phone-pad'}
                    style={styles.textInput}
                    textAlign={selectedLangWriteFrom}
                />
            </View>
            <View style={styles.section}>
                <TranslatableText data={"form:password:label"} style={styles.label} />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.textInput}
                    textAlign={selectedLangWriteFrom}
                />
            </View>
            <View style={styles.section}>
                <RNBounceable onPress={onLoginPress} >
                    {isLoading ?
                        <ActivityIndicator size="large" color={COLOR_PRIMARY} animating={isLoading} /> :
                        <View style={styles.buttonContained}>
                            <TranslatableText style={styles.buttonTextContained} data={'common:login'} />
                        </View>
                    }
                </RNBounceable>
            </View>
            <View style={styles.section}>
                <RNBounceable >{/* TODO: navigate to register */}
                    <View style={styles.buttonOutlined}>
                        <TranslatableText style={styles.buttonTextOutlined} data={'common:register'} />
                    </View>
                </RNBounceable>
            </View>
            <View style={styles.section}>
                <RNBounceable >
                    <TranslatableText style={styles.forgetPasswordText} data={'common:forgot-password?'} />
                </RNBounceable>
            </View>

            <View style={styles.section}>
                {/* TODO: legal consent */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        padding: 10,
        gap: 15,
    },
    section: {
        width: '90%',
    },
    label: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    },
    textInput: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
        borderColor: COLOR_PRIMARY + '88',
        borderBottomWidth: 1.5,
        borderRadius: 50,
        fontSize: 22,
    },
    buttonOutlined: {
        borderColor: COLOR_PRIMARY,
        backgroundColor: 'white',
        borderWidth: 0.18,
        borderRadius: 20,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 4,
    },
    buttonContained: {
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 20,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 4,
    },
    buttonTextOutlined: {
        textAlign: 'center',
        color: COLOR_PRIMARY,
        fontSize: 19,
        fontWeight: '700',
    },
    buttonTextContained: {
        textAlign: 'center',
        color: 'white',
        fontSize: 19,
        fontWeight: '700',
    },
    forgetPasswordText: {
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    description: {
        fontSize: 17,
        textAlign: 'center',
    },
});
