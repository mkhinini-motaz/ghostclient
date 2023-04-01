import React, {memo} from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import FormField from "./FormField";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface FormProps {
    fields: any[], // TODO: change type any
    value: any, // TODO: change type any
    onChange: (newValue: any) => void
}

function Form({ fields, value, onChange }: FormProps): JSX.Element {
    const fieldsComponents = [];
    for (let field of fields) {
        fieldsComponents.push(<FormField {...field}
            key={'form_field_' + field.label + '_' + field.value}
            value={value[field.name]}
            onChange={(newValue) => {
                onChange({ ...value, [field.name]: newValue })
            }
            }
        />)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.container} >
                    {fieldsComponents}
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 30,
        paddingVertical: 15,
    }
});

export default memo(Form);
