import React, {useMemo} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from "@freakycoder/react-native-bounceable";
import TranslatableText from "../Common/TranslatableText";
import ProductClass from "../../classes/Product";
import {API_URL, BOX_SHADOW_CSS_RULE, BOX_SHADOW_SIDE_DOWN_CSS_RULE} from "../../constants";
import MoneyFormatter from "../Common/MoneyFormatter";
import LangAwareView from "../Common/LangAwareView";
import {useSelector} from "../../store/hooks";

interface ProductProps {
    data: ProductClass
}

export default function Product({ data }: ProductProps): JSX.Element {
    const navigation = useNavigation();
    const { selectedLangWriteFrom } = useSelector((state) => state.I18n);

    const onPress = () => {
        if (data.type === 2) { // TODO: constants
            navigation.navigate('ProductWithOptions', { product: data });
        }
        // Todo: else add to cart
    };

    const imageStyle = useMemo(() => {
        const dynamicStyle = (selectedLangWriteFrom === 'left' ?
            { borderTopRightRadius: 20, borderBottomRightRadius: 20, } :
            { borderTopLeftRadius: 20, borderBottomLeftRadius: 20, }
        );
        return { ...styles.image, ...dynamicStyle, };
    }, [selectedLangWriteFrom]);

    return (
        <RNBounceable onPress={onPress}>
            <LangAwareView style={styles.container}>
                <View style={styles.textContainer}>
                    <LangAwareView style={styles.nameContainer}>
                        <TranslatableText data={data.category.name} style={styles.nameText} />
                        <Text style={styles.nameText} > - </Text>
                        <TranslatableText data={data.name} style={styles.nameText} />
                    </LangAwareView>
                    <LangAwareView>
                        <MoneyFormatter data={data.price} style={styles.money} />
                    </LangAwareView>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: API_URL + data.photo }} style={imageStyle} />
                </View>
            </LangAwareView>
        </RNBounceable>
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
    nameContainer: {
        flexWrap: 'wrap',
    },
    nameText: {
        fontSize: 18,
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
    },
    image: {
        height: 120,
        width: '100%',
    },
    money: {
        fontSize: 15,
        fontWeight: '500',
    },
});
