import React, {useCallback, useMemo, useState} from 'react';
import { ActivityIndicator, Alert, Button, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import MaskInput from 'react-native-mask-input';
import { COLOR_PRIMARY } from "../constants";
import TranslatableText from "../components/Common/TranslatableText";
import {translate} from "../i18n";
import {useAuthenticateClient, useLang} from "../store/hooks";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import Logo from "../components/Common/Logo";
import {useMutation} from "react-query";
import { login } from "../api/auth";
import {phoneMask} from "../support/utils";
import PhoneInput from "../components/Form/PhoneInput";

interface LoginScreenProps {
    navigation: any,
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [phone, setPhone] = React.useState('+21628852800'); // TODO: set to '+216 '
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
    const onLoginPress = () => mutate({ phone: phone.replaceAll(' ', ''), password });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: 'white' }}>
            <KeyboardAvoidingView style={styles.container} >
                <Logo />

                <View style={styles.section}>
                    <TranslatableText data={"form:phone:label"} style={styles.label} />
                    <PhoneInput
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.textInput}
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
                <View style={styles.buttonSection}>
                    <RNBounceable onPress={onLoginPress} >
                        {isLoading ?
                            <ActivityIndicator size="large" color={COLOR_PRIMARY} animating={isLoading} /> :
                            <View style={styles.buttonContained}>
                                <TranslatableText style={styles.buttonTextContained} data={'common:login'} />
                            </View>
                        }
                    </RNBounceable>
                    <RNBounceable >{/* TODO: navigate to register */}
                        <View style={styles.buttonOutlined}>
                            <TranslatableText style={styles.buttonTextOutlined} data={'common:register'} />
                        </View>
                    </RNBounceable>
                    <RNBounceable >
                        <TranslatableText style={styles.forgetPasswordText} data={'common:forgot-password?'} />
                    </RNBounceable>
                </View>

                <View style={styles.section}>
                    {/* TODO: legal consent */}
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        paddingTop: '17%',
        gap: 30,
    },
    section: {
        width: '90%',
    },
    buttonSection: {
        width: '90%',
        gap: 20,
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
