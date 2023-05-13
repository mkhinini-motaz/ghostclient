import React, {useMemo, useState} from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { COLOR_PRIMARY } from "../constants";
import {translate} from "../i18n";
import {useLang} from "../store/hooks";
import Logo from "../components/Common/Logo";
import {requestOtp} from "../api/auth";
import {GENDERS} from "../classes/Client";
import { FORM_FIELD_TYPE_BUTTON, FORM_FIELD_TYPE_DATE, FORM_FIELD_TYPE_PASSWORD, FORM_FIELD_TYPE_PHONE, FORM_FIELD_TYPE_RADIO, FORM_FIELD_TYPE_SUBMIT } from "../support/form";
import Form from "../components/Form/Form";
import {alertNetworkError, formatDate} from "../support/utils";

interface RegisterScreenProps {
    navigation: any,
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const { selectedLang } = useLang();

    const maxDate = useMemo(() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 4);
        return date;
    }, []);

    const [otpIsLoading, setOtpIsLoading] = useState(false);

    const onSubmit = () => {
        setOtpIsLoading(true);
        requestOtp(formData.phone.replaceAll(' ', ''), selectedLang)
            .then(() => {
                navigation.navigate('OtpScreen', {
                    ...formData,
                    phone: formData.phone.replaceAll(' ', ''),
                    birth_date: formatDate(formData.birth_date.getTime() / 1000, '-'),
                });
            })
            .catch(error => {
                if (error.code === 'ERR_NETWORK') {
                    alertNetworkError(selectedLang);
                    return;
                }

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
    const onLoginPress =  () => navigation.replace('LoginScreen');

    const [ formData, setFormData ] = useState({ phone: '+216 ' });
    const options = GENDERS.map(gender => ({ label: 'common:gender:' + gender, value: gender }));

    const fields = [
        {
            name: 'first_name',
            label: 'form:first_name:label',
        },
        {
            name: 'last_name',
            label: 'form:last_name:label',
        },
        {
            name: 'gender',
            label: 'form:gender:label',
            type: FORM_FIELD_TYPE_RADIO,
            options
        },
        {
            name: 'birth_date',
            label: 'form:birth_date:label',
            type: FORM_FIELD_TYPE_DATE,
            maxDate,
        },
        {
            name: 'phone',
            label: 'form:phone:label',
            type: FORM_FIELD_TYPE_PHONE,
        },
        {
            name: 'password',
            label: 'form:password:label',
            type: FORM_FIELD_TYPE_PASSWORD,
        },
        {
            name: 'password_confirmation',
            label: 'form:password_confirmation:label',
            type: FORM_FIELD_TYPE_PASSWORD,
        },
        {
            name: 'invite_code',
            label: 'form:invite_code:label',
        },
        {
            label: 'common:register',
            type: FORM_FIELD_TYPE_SUBMIT,
            isLoading: otpIsLoading,
        },
        {
            label: 'common:login',
            type: FORM_FIELD_TYPE_BUTTON,
            onPress: onLoginPress,
            buttonType: 'outlined',
        },
    ];

    return (
        <View style={styles.container} >
            <Logo />

            {/* TODO: description */}
            <Form value={formData} fields={fields} onChange={setFormData} onSubmit={onSubmit} />

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
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        paddingTop: 40,
        gap: 20,
    },
    section: {
        width: '90%',
    },
    datePickerContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
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
    radioLabel: {
        fontSize: 19,
    }
});
