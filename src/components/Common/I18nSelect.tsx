import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {availableLangs} from "../../i18n";
import {useDispatch, useSelector} from "../../store/hooks";
import {setLang} from "../../store/actions/i18n";

interface I18nSelectProps {

}

export default function I18nSelect({}: I18nSelectProps): JSX.Element {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const selectedLang = useSelector((state) => state.I18n.selectedLang);
    let items = [];
    for (let lang in availableLangs) {
        items.push({ label: 'lang:' + lang , value: lang });
    }

    return (
        <View>
            <DropDownPicker
                open={isOpen}
                value={selectedLang}
                items={items}
                setOpen={setIsOpen}
                setValue={(value) => dispatch(setLang(value()))}
            />
        </View>
    );
};

const styles = StyleSheet.create({});
