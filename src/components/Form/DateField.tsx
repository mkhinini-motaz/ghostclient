import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker'
import TranslatableText from "../Common/TranslatableText";
import {COLOR_PRIMARY} from "../../constants";

interface DateFieldProps {
    value: Date,
    label: string,
    onChange: (newValue: Date) => void
    maxDate: Date|undefined,
}

function DateField({ value, label, onChange, maxDate = undefined }: DateFieldProps): JSX.Element {
    const newDate = useMemo(() => new Date(), []);
    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={{ ...styles.label, marginBottom: 15 }} />
            <View style={{ paddingHorizontal: 10 }}>
                <View style={styles.datePickerContainer}>
                    <DatePicker maximumDate={maxDate} date={value || newDate} onDateChange={onChange} mode={'date'} theme={'light'} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
    label: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY
    },
});

export default memo(DateField)
