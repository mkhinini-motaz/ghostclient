import React from 'react';
import {StyleSheet, ViewStyle, View } from 'react-native';
import {useSelector} from "../../store/hooks";

interface LangAwareViewProps {
    style?: ViewStyle,
    direction?: 'row'|'column',
    children?: any,
}

export default function LangAwareView({ style, direction = 'row', children }: LangAwareViewProps): JSX.Element {
    const selectedLangWriteFrom = useSelector((state) => state.I18n.selectedLangWriteFrom);
    return (
        <View style={{ flexDirection: direction + (selectedLangWriteFrom === 'right' ? '-reverse' : ''), ...style }}>
            { children }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
});
