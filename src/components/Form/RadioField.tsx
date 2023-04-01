import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import TranslatableText from "../Common/TranslatableText";
import AnimatedCheckbox from 'react-native-checkbox-reanimated'
import {GENDERS} from "../../classes/Client";
import {COLOR_PRIMARY} from "../../constants";
import {genderRadioButtons} from "../../support/form";
import {useLang} from "../../store/hooks";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import LangAwareView from "../Common/LangAwareView";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import Icon from "react-native-vector-icons/AntDesign";

interface RadioFieldProps {
    value: number,
    label: string,
    buttons: any, // TODO: remove type any
    onChange: (newValue: number) => void
}


function RadioField({ value, label, onChange, buttons }: RadioFieldProps): JSX.Element {
    const { selectedLang } = useLang();
    const buttonsComponents = [];



    for (let button of buttons) {
        const isSelected = value === button.value;
        buttonsComponents.push(<RNBounceable onPress={() => onChange(button.value)} key={'checkbox_' + button.value} style={styles.checkboxContainer} >
            <TranslatableText data={button.label} style={styles.label} />
                <BouncyCheckbox disableBuiltInState
                                size={50}
                                fillColor={COLOR_PRIMARY}
                                isChecked={isSelected}
                                iconComponent={!isSelected ? '' : <Icon size={38} name={'check'} color={'white'} />}
                                textContainerStyle={{ marginLeft: 0, }}
                                onPress={() => onChange(button.value)}
                />
        </RNBounceable>)
    }

    return (
        <View style={styles.container}>
            <TranslatableText data={label} style={{ ...styles.label, marginBottom: 10 }} />
            <LangAwareView style={styles.buttonsContainer}>
                {buttonsComponents}
            </LangAwareView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY,
    },
    checkboxLabel: {
        fontSize: 25,
    },
    checkboxContainer: {
        flexDirection: 'row',
        padding: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        gap: 10,
    },
    checkboxIconContainer: {
        height: 60,
        width: 60,
    },
});

export default memo(RadioField);
