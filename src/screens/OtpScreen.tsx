import React, {memo, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, Keyboard, StyleSheet, View} from 'react-native';
import {COLOR_PRIMARY} from "../constants";
import {useAuthenticateClient, useLang} from "../store/hooks";
import OtpField from "../components/Common/Otp";
import {useMutation} from "react-query";
import {register, requestOtp} from "../api/auth";
import {translate} from "../i18n";
import ButtonField from "../components/Form/ButtonField";
import {alertNetworkError} from "../support/alert";

interface OtpScreenProps {
    route: any,
}

function OtpScreen({ route }: OtpScreenProps): JSX.Element {
    const { selectedLang } = useLang();
    const authenticateClient = useAuthenticateClient();

    const registerFormData = route.params;
    const [otp, setOtp] = useState('');
    const [otpIsLoading, setOtpIsLoading] = useState(false);
    const [requestOtpIsActive, setRequestOtpIsActive] = useState(true);
    const timeoutIdRef = useRef(-1);

    useEffect(() => () => clearTimeout(timeoutIdRef.current), []);

    const { mutate, isLoading } = useMutation({
        mutationFn: register,
        onSuccess: authenticateClient,
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }

            const errorMsg = error.response.data?.message === 'phone.code' ? 'otp:validation:wrong' : 'otp:request:error:title';
            Alert.alert('', translate(errorMsg, selectedLang), [{ text: translate('common:ok', selectedLang), }],);
        }
    });

    const onOtpRequestPress = () => {
        if (! requestOtpIsActive) {
            Alert.alert('', translate('otp:request:timeout:message', selectedLang), [{ text: translate('common:ok', selectedLang), }]);
            return;
        }
        requestOtp(registerFormData.phone, selectedLang)
            .then(() => {
                setRequestOtpIsActive(false);
                timeoutIdRef.current = setTimeout(() => setRequestOtpIsActive(true), 60000)
            })
            .catch(() => {
                Alert.alert(
                    translate('otp:request:error:title', selectedLang),
                    translate('otp:request:error:message', selectedLang),
                    [{
                        text: translate('common:ok', selectedLang),
                    }],
                );
            })
            .finally(() => setOtpIsLoading(false));
    };

    const onOtpChange = (newOtp) => {
        setOtp(newOtp.trimEnd());
        const spaceFreeOtp = newOtp.replaceAll(' ', '');
        if (spaceFreeOtp.length === 6 && ! isLoading) {
            Keyboard.dismiss();
            mutate({ ...registerFormData, otp: spaceFreeOtp });
        }
    };

    return (
        <View style={styles.container}>
            <OtpField value={otp} onChange={onOtpChange} />

            <View style={{ width: '100%' }}>
                <ButtonField label={'otp:validation:didnt_receive'} buttonType={requestOtpIsActive ? 'contained' : 'outlined'} onPress={onOtpRequestPress} isLoading={otpIsLoading} />
            </View>
            <ActivityIndicator size="large" color={COLOR_PRIMARY} animating={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        paddingTop: '20%',
        gap: 30,
    },
    label: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    },
    fieldContainer: {
        width: '50%',
    },
    halfWidth: {
        width: '50%',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#333333'
    },
    didntReceiveContainer: {
        gap: 10,
        paddingHorizontal: 10,
    },
});

export default memo(OtpScreen);
