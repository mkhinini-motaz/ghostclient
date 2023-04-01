import React, {useCallback, useMemo, useState} from 'react';
import { ActivityIndicator, Alert, Button, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-date-picker'
import { COLOR_PRIMARY } from "../constants";
import TranslatableText from "../components/Common/TranslatableText";
import {translate} from "../i18n";
import {useLang} from "../store/hooks";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import Logo from "../components/Common/Logo";
import {useMutation} from "react-query";
import { login } from "../api/auth";
import PhoneInput from "../components/Form/PhoneInput";
import {SHOWN_TYPES} from "../classes/Order";
import {GENDERS} from "../classes/Client";
import {setOrderType} from "../store/actions/cart";
import {
    FORM_FIELD_TYPE_BUTTON,
    FORM_FIELD_TYPE_DATE, FORM_FIELD_TYPE_PASSWORD,
    FORM_FIELD_TYPE_PHONE,
    FORM_FIELD_TYPE_RADIO,
    genderRadioButtons
} from "../support/form";
import Form from "../components/Form/Form";

interface LoginScreenProps {
    navigation: any,
}

export default function RegisterScreen({ navigation }: LoginScreenProps) {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [gender, setGender] = React.useState<number>();
    const [birthDate, setBirthDate] = React.useState(new Date());
    const [phone, setPhone] = React.useState('+216 ');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { selectedLang, selectedLangWriteFrom } = useLang();

    const maxDate = useMemo(() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 4);
        return date;
    }, []);


    const { mutate, isLoading } = useMutation({
        mutationFn: login, // Todo: register
        onError: (error) => {
            // TODO: handle each input error
            Alert.alert(
                '',
                translate('login:error', selectedLang),
                [{ text: translate('common:ok', selectedLang), }],
            );
        }
    });

    const onSubmit = () => { /* TODO: implement */ };
    const onLoginPress =  () => navigation.replace('LoginScreen');
    const onRadioButtonPressed = useCallback((newRadioButtons) => {
        for (let radioButton of newRadioButtons) {
            if (radioButton.selected) {
                setGender(radioButton.value);
                break;
            }
        }
        setRadioButtons(newRadioButtons);
    }, [])

    const [ formData, setFormData ] = useState({});
    const [radioButtons, setRadioButtons] = useState(genderRadioButtons(selectedLang, formData.gender));
    const buttons = useMemo(() => GENDERS.map(gender => ({ label: 'common:gender:' + gender, value: gender })), []);

    const fields = useMemo(() => [
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
            buttons
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
            label: 'common:register',
            type: FORM_FIELD_TYPE_BUTTON,
            onPress: onSubmit,
            isLoading,
        },
        {
            label: 'common:login',
            type: FORM_FIELD_TYPE_BUTTON,
            onPress: onLoginPress,
            buttonType: 'outlined',
        },
    ], []);


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.container} >
                    <Logo />

                    {/* TODO: description */}
                    <Form value={formData} fields={fields} onChange={setFormData} />

                    <View style={styles.section}>
                        {/* TODO: legal consent */}
                    </View>
                </View>
            </KeyboardAwareScrollView>
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
