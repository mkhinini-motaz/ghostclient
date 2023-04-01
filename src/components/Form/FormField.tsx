import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
    FORM_FIELD_TYPE_BUTTON,
    FORM_FIELD_TYPE_DATE,
    FORM_FIELD_TYPE_PASSWORD,
    FORM_FIELD_TYPE_PHONE,
    FORM_FIELD_TYPE_RADIO, FORM_FIELD_TYPE_TEXT
} from "../../support/form";
import PhoneField from "./PhoneField";
import PasswordField from "./PasswordField";
import DateField from "./DateField";
import RadioField from "./RadioField";
import TextField from "./TextField";
import ButtonField from "./ButtonField";


function FormField({ type, ...props }: any): JSX.Element {
    switch (type) {
        case FORM_FIELD_TYPE_PHONE:
            return <PhoneField {...props} />;

        case FORM_FIELD_TYPE_PASSWORD:
            return <PasswordField {...props} />;

        case FORM_FIELD_TYPE_DATE:
            return <DateField {...props} />;

        case FORM_FIELD_TYPE_RADIO:
            return <RadioField {...props} />;
        case FORM_FIELD_TYPE_BUTTON:
            return <ButtonField {...props} />;

        case FORM_FIELD_TYPE_TEXT:
        default:
            return <TextField {...props} />
    }
}

const styles = StyleSheet.create({});

export default memo(FormField);
