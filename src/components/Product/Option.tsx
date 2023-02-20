import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import OptionClass, {DEFAULT_QUANTITY} from "../../classes/Option";
import TranslatableText from "../Common/TranslatableText";
import MoneyFormatter from "../Common/MoneyFormatter";
import {API_URL, COLOR_PRIMARY} from "../../constants";
import {useSelector} from "../../store/hooks";
import LangAwareView from "../Common/LangAwareView";
import RNBounceable from "@freakycoder/react-native-bounceable";
import {Slider} from '@miblanchard/react-native-slider';

interface OptionProps {
    data: OptionClass,
    isSelected: boolean,
    isQuantifiable: boolean,
    onPress: (value: boolean) => any|void,
    onQuantityChange: (value: number) => void,
}

export default function Option({ data, isSelected, isQuantifiable, onPress, onQuantityChange }: OptionProps): JSX.Element {
    const { selectedLangWriteFrom } = useSelector((state) => state.I18n);

    const imageStyle = useMemo(() => {
        const dynamicStyle = (selectedLangWriteFrom === 'left' ?
                { borderTopRightRadius: 20, borderBottomRightRadius: 20, } :
                { borderTopLeftRadius: 20, borderBottomLeftRadius: 20, }
        );
        return { ...styles.image, ...dynamicStyle, };
    }, [selectedLangWriteFrom]);

    const checkBoxStyle = useMemo(() => {
        const dynamicStyle = (selectedLangWriteFrom === 'left' ?
                { borderTopRightRadius: 20, borderBottomLeftRadius: 7, } :
                { borderTopLeftRadius: 20, borderBottomRightRadius: 7 }
        );
        return { ...styles.checkbox, ...dynamicStyle, };
    }, [selectedLangWriteFrom]);

    let bouncyCheckboxRef: BouncyCheckbox | null = null;
    return (
        <View>
            <LangAwareView style={styles.container}>
                <View style={styles.textContainer}>
                    <TranslatableText data={data.name} style={styles.nameText} />
                    <LangAwareView>
                        {! data.price ? <></> : <MoneyFormatter data={data.price} style={styles.money} />}
                    </LangAwareView>
                    {! (isQuantifiable && isSelected) ? '' :
                        <View style={{width:'100%'}}>
                            <Slider
                                value={data.quantity || DEFAULT_QUANTITY}
                                onValueChange={value => onQuantityChange(value[0])}
                                minimumValue={1}
                                maximumValue={3}
                                step={1}
                                thumbTintColor={COLOR_PRIMARY}
                                minimumTrackTintColor={COLOR_PRIMARY + 'bb'}
                                maximumTrackTintColor={COLOR_PRIMARY+'55'}
                            />
                        </View>
                    }
                </View>
                <View style={styles.imageContainer}>
                    <RNBounceable onPress={() => bouncyCheckboxRef.onPress(! isSelected)}>
                        <View style={{ ...styles.checkboxContainer, alignSelf: selectedLangWriteFrom === 'left' ? 'flex-end' : 'flex-start' }}>
                            <BouncyCheckbox disableBuiltInState
                                            size={50}
                                            fillColor={COLOR_PRIMARY}
                                            isChecked={isSelected}
                                            iconImageStyle={{ height: 38, width: 38 }}
                                            innerIconStyle={checkBoxStyle}
                                            textContainerStyle={{ marginLeft: 0, }}
                                            onPress={(value) => onPress(! isSelected)}
                                            ref={(ref: any) => (bouncyCheckboxRef = ref)}
                            />
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
        fontSize: 20,
    },
    textContainer: {
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
        fontSize: 19,
        fontWeight: '700',
    },
    checkboxContainer: {
        position: 'absolute',
        zIndex: 3,
    },
    checkbox: {
        borderRadius: 0,
        borderWidth: 8,
    }
});
