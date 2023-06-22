import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RadioGroup from 'react-native-radio-options-group';
import {SHOWN_TYPES} from "../../classes/Order";
import {translate} from "../../i18n";
import {useDispatch, useLang, useSelector} from "../../store/hooks";
import LangAwareView from "../Common/LangAwareView";
import {COLOR_PRIMARY} from "../../constants";
import {setOrderType} from "../../store/actions/cart";

interface TypeProps {

}

export default function Type({}: TypeProps): JSX.Element {
    const dispatch = useDispatch();
    const { selectedLang } = useLang();
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
        for (let radioButton of newRadioButtons) {
            if (radioButton.selected) {
                dispatch(setOrderType(radioButton.value));
                break;
            }
        }
        setRadioButtons(newRadioButtons);
    }, []);
    return (
        <LangAwareView style={styles.container}>
            <RadioGroup
                radioButtons={radioButtons}
                onPress={onPress}
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
