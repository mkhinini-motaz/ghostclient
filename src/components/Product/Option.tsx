import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import OptionClass from "../../classes/Option";
import TranslatableText from "../Common/TranslatableText";
import MoneyFormatter from "../Common/MoneyFormatter";
import {API_URL, COLOR_PRIMARY} from "../../constants";
import {useSelector} from "../../store/hooks";
import LangAwareView from "../Common/LangAwareView";
import RNBounceable from "@freakycoder/react-native-bounceable";

interface OptionProps {
    data: OptionClass,
}

export default function Option({ data }: OptionProps): JSX.Element {
    const { selectedLangWriteFrom } = useSelector((state) => state.I18n);

    const imageStyle = useMemo(() => {
        const dynamicStyle = (selectedLangWriteFrom === 'left' ?
                { borderTopRightRadius: 20, borderBottomRightRadius: 20, } :
                { borderTopLeftRadius: 20, borderBottomLeftRadius: 20, }
        );
        return { ...styles.image, ...dynamicStyle, };
    }, [selectedLangWriteFrom]);

    return (
        <View>
            <LangAwareView style={styles.container}>
                <LangAwareView style={styles.textContainer}>
                    <TranslatableText data={data.name} style={styles.nameText} />
                    {! data.price ? <></> : <MoneyFormatter data={data.price} style={styles.money} />}
                </LangAwareView>
                <View style={styles.imageContainer}>
                    <RNBounceable>
                        <View style={styles.checkboxContainer}>
                            <BouncyCheckbox size={50} fillColor={COLOR_PRIMARY} isChecked={!! data.is_selected_by_default} iconImageStyle={{ height: 30, width: 30 }} textContainerStyle={{ marginLeft: 0, }} onPress={(isChecked: boolean) => {}} disableBuiltInState />
                        </View>
                        <Image source={{ uri: API_URL + data.photo }} style={imageStyle} />
                    </RNBounceable>
                </View>
            </LangAwareView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        borderRadius: 20,
        margin: 5,
    },
    nameText: {
        fontSize: 18,
    },
    textContainer: {
        flexWrap: 'wrap',
        padding: 10,
        flexBasis: 1,
        flexGrow: 1,
        gap: 5,
    },
    imageContainer: {
        flexBasis: 1,
        flexGrow: 1,
        position: 'relative',
    },
    image: {
        height: 120,
        width: '100%',
    },
    money: {
        fontSize: 15,
        fontWeight: '500',
    },
    checkboxContainer: {
        position: 'absolute',
        zIndex: 3,
        alignSelf: 'flex-end',
    }
});
