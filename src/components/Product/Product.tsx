import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from "@freakycoder/react-native-bounceable";
import FastImage from 'react-native-fast-image'
import { createImageProgress } from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import TranslatableText from "../Common/TranslatableText";
import ProductClass, { TYPE_WEIGHTABLE } from "../../classes/Product";
import { API_URL, COLOR_PRIMARY } from "../../constants";
import MoneyFormatter from "../Common/MoneyFormatter";
import LangAwareView from "../Common/LangAwareView";
import { useSelector } from "../../store/hooks";
import QuantityButton from "../Common/QuantityButton";

const Image = createImageProgress(FastImage);

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
                        {data.type !== TYPE_WEIGHTABLE ? '' : <>
                            <Text style={styles.money}> / </Text>
                            <TranslatableText data={'common:kg'} style={styles.money} />
                        </>}
                    </LangAwareView>
                    <QuantityButton key={"quantity-button-" + data.id}
                                    data={2} // TODO
                                    onPress={(newValue, addedValue) => console.log({ newValue, addedValue })} // TODO
                                    forWeight={data.type === TYPE_WEIGHTABLE}/>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: API_URL + data.photo }}
                           style={styles.image}
                           imageStyle={imageStyle}
                           renderIndicator={() => <Progress.Circle size={100} fill={'white'} thickness={15} showsText color={COLOR_PRIMARY} borderWidth={0} />}
                    />
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
        minHeight: 130,
        width: '100%',
    },
    money: {
        fontSize: 20,
        fontWeight: '500',
    },
});
