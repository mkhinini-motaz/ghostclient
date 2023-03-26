import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {SHOWN_TYPES} from "../../classes/Order";
import {translate} from "../../i18n";
import {useDispatch, useSelector} from "../../store/hooks";
import LangAwareView from "../Common/LangAwareView";
import {COLOR_PRIMARY} from "../../constants";

interface TypeProps {

}

export default function Type({}: TypeProps): JSX.Element {
    const dispatch = useDispatch();
    const { selectedLang } = useSelector((state) => state.I18n);
    const { type } = useSelector((state) => state.Cart);
    const [radioButtons, setRadioButtons] = useState(SHOWN_TYPES.map((value) => ({
        id: 'type_' + value,
        label: translate('order:type:' + value, selectedLang),
        value: value,
        selected: value === type,
        color: COLOR_PRIMARY,
        labelStyle: styles.radioLabel,
    })));

    const onPress = useCallback((newRadioButtons) => {

    }, []);
    return (
        <LangAwareView style={styles.container}>
            <RadioGroup
                radioButtons={radioButtons}
                onPress={setRadioButtons}
                value={type}
                layout={'row'}
            />
        </LangAwareView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
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
    radioContainer: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
    },
    radioLabel: {
        fontSize: 19,
    }
});
