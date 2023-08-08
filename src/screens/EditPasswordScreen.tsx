import React, {memo, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {COLOR_PRIMARY} from "../constants";
import {useAuthenticateClient, useLang} from "../store/hooks";
import OtpField from "../components/Common/Otp";
import {useMutation} from "react-query";
import {requestOtp, resetPassword, updatePassword} from "../api/auth";
import {translate} from "../i18n";
import ButtonField from "../components/Form/ButtonField";
import { FORM_FIELD_TYPE_PASSWORD, FORM_FIELD_TYPE_SUBMIT } from "../support/form";
import Form from "../components/Form/Form";
import {alertNetworkError, alertUpdatePasswordSuccess} from "../support/alert";

interface EditPasswordScreenProps {
    route: any,
    navigation: any,
}

export default function EditPasswordScreen({ route, navigation }: EditPasswordScreenProps): JSX.Element {
    const { selectedLang } = useLang();
    const authenticateClient = useAuthenticateClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: updatePassword,
        onSuccess: async (client) => {
            await authenticateClient(client);
            alertUpdatePasswordSuccess(selectedLang);
            navigation.goBack();

        },
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }

            if (error.response.status === 403) {
                Alert.alert(translate('validation:current_password', selectedLang), [{ text: translate('common:ok', selectedLang), }],);
            }
        }
    });

    const onSubmit = () => { mutate(formData); };
    const [ formData, setFormData ] = useState({});
    const fields = [
        {
            name: 'current_password',
            label: 'form:current_password:label',
            type: FORM_FIELD_TYPE_PASSWORD,
        },
        {
            name: 'password',
            label: 'form:new_password:label',
            type: FORM_FIELD_TYPE_PASSWORD,
        },
        {
            name: 'password_confirmation',
            label: 'form:password_confirmation:label',
            type: FORM_FIELD_TYPE_PASSWORD,
        },
        {
            label: 'common:confirm',
            type: FORM_FIELD_TYPE_SUBMIT,
            isLoading: isLoading,
        },
    ];

    return (
        <View style={styles.container}>
            <Form value={formData} fields={fields} onChange={setFormData} onSubmit={onSubmit} />
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

