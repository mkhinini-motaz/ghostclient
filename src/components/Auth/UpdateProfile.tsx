import React, {memo, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAuthenticateClient, useClient, useLang,} from "../../store/hooks";
import {updateProfile} from "../../api/auth";
import {useMutation} from "react-query";
import {GENDERS} from "../../classes/Client";
import { FORM_FIELD_TYPE_DATE, FORM_FIELD_TYPE_OTP, FORM_FIELD_TYPE_PHONE, FORM_FIELD_TYPE_RADIO, FORM_FIELD_TYPE_SUBMIT } from "../../support/form";
import {COLOR_PRIMARY} from "../../constants";
import Form from "../Form/Form";
import {formatDate, strToDate} from "../../support/utils";
import {alertNetworkError} from "../../support/alert";

interface UpdateProfileProps {

}

function UpdateProfile({}: UpdateProfileProps): JSX.Element {
    const client = useClient();
    const authenticateClient = useAuthenticateClient();
    const { selectedLang } = useLang();
    const [ formData, setFormData ] = useState({ ...client, birth_date: strToDate(client.birth_date) });

    const maxDate = useMemo(() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 4);
        return date;
    }, []);

    const { mutate, isLoading: profileUpdateIsLoading } = useMutation({
        mutationFn: updateProfile,
        onSuccess: (returnedClient) => authenticateClient({ ...client, ...returnedClient }),
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }
            // TODO: implement
            console.log({ error: error.response.data})
        }
    });

    const onSubmit = () => {
        mutate({
            ...formData,
            phone: formData.phone.replaceAll(' ', ''),
            birth_date: formatDate(formData.birth_date.getTime() / 1000, '-'),
            otp: formData.otp ? formData.otp.replaceAll(' ', '') : undefined,
        })
    };

    const otpField = {
        name: 'otp',
        label: 'form:otp:label',
        type: FORM_FIELD_TYPE_OTP,
        withRequestButton: true,
        phone: formData.phone.replaceAll(' ', ''),
    };

    const options = GENDERS.map(gender => ({ label: 'common:gender:' + gender, value: gender }));
    let fields = [
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
            label: 'common:save',
            type: FORM_FIELD_TYPE_SUBMIT,
            isLoading: profileUpdateIsLoading,
        },
    ];

    if (client.phone !== formData.phone.replaceAll(' ', '')) {
        fields.splice(-1, 0, otpField);
    }

    return (
        <View style={styles.container}>
            <Form key={'update_profile_' + fields.length} fields={fields} value={formData} onChange={setFormData} onSubmit={onSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 10,
        gap: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY,
    }
});

export default memo(UpdateProfile);
