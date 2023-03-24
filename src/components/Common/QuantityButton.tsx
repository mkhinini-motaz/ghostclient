import React from 'react';
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, View, Text } from 'react-native';
import LangAwareView from "./LangAwareView";
import {translate} from "../../i18n";
import {useSelector} from "../../store/hooks";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";

interface QuantityButtonProps {
    data: number,
    onPress: (newValue: number, addedValue: number) => void,
    hideCount?: boolean,
    forWeight?: boolean,
}

export default function QuantityButton({ data, onPress, hideCount = false, forWeight = false }: QuantityButtonProps): JSX.Element {
    const { selectedLang } = useSelector((state) => state.I18n);
    const step = forWeight ? 200 : 1;

    const icons = [];
    if (data > 0) {
        icons.push((
            <Icon
                color={COLOR_SECONDARY}
                size={30}
                key={"quantity-button-count-minus"}
                name={'minuscircleo'}
                onPress={() => {onPress(data - step, -step)}}
            />
        ));

        if (! hideCount) {
            icons.push((
                <LangAwareView key={'quantity-button-count'} style={{ marginHorizontal: 5 }} >
                    {data > 999 ?
                        [<Text key={'txt-1'} style={styles.text}>{(data / 1000).toString().replace('.', ',')}</Text>, <Text key={'txt-2'} style={styles.text}>{(forWeight ? translate('common:kg', selectedLang, true) : '')}</Text>] :
                        [<Text key={'txt-1'} style={styles.text}>{data}</Text>, <Text key={'txt-2'} style={styles.text}>{forWeight ? translate('common:g', selectedLang, true) : ''}</Text>]
                    }
                </LangAwareView>
            ));
        }

        icons.push((
            <Icon
                color={COLOR_PRIMARY}
                size={30}
                key={"quantity-button-count-plus"}
                name={'pluscircleo'}
                onPress={() => {onPress(data + step, step)}}
            />
        ));

    }

    return (
        <LangAwareView style={styles.container} >
            {icons}
        </LangAwareView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
    text: {
        fontSize: 20,
    }
});
