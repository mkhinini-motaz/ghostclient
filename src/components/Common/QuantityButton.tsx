import React from 'react';
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, View, Text, ViewStyle} from 'react-native';
import LangAwareView from "./LangAwareView";
import {translate} from "../../i18n";
import {useLang, useSelector} from "../../store/hooks";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import {WEIGHTABLE_DEFAULT_STEP} from "../../classes/Product";

interface QuantityButtonProps {
    data: number,
    onPress: (newValue: number, addedValue: number) => void,
    hideCount?: boolean,
    forWeight?: boolean,
    style?: ViewStyle,
}

export default function QuantityButton({ data, onPress, hideCount = false, forWeight = false, style }: QuantityButtonProps): JSX.Element {
    const { selectedLang } = useLang();
    const step = forWeight ? WEIGHTABLE_DEFAULT_STEP : 1;

    const icons = [];
    if (data > 0) {
        icons.push((
            <RNBounceable key={"quantity-button-count-minus"} onPress={() => {onPress(data - step, -step)}}>
                <Icon color={COLOR_SECONDARY}
                      size={30}
                      name={'minuscircleo'}
                />
            </RNBounceable>
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
            <RNBounceable key={"quantity-button-count-plus"} onPress={() => {onPress(data + step, step)}}>
                <Icon
                    color={COLOR_PRIMARY}
                    size={30}
                    name={'pluscircleo'}
                />
            </RNBounceable>
        ));

    }

    return (
        <LangAwareView style={{ ...styles.container, ...style }} >
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
