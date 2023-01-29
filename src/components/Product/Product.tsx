import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TranslatableText from "../Common/TranslatableText";
import ProductClass from "../../classes/Product";
import {API_URL, BOX_SHADOW_CSS_RULE, BOX_SHADOW_SIDE_DOWN_CSS_RULE} from "../../constants";
import MoneyFormatter from "../Common/MoneyFormatter";

interface ProductProps {
    data: ProductClass
}

export default function Product({ data }: ProductProps): JSX.Element {
    const navigation = useNavigation();
    const onPress = () => {
        if (data.type === 2) { // TODO: constants
            navigation.navigate('ProductWithOptions', { product: data });
        }
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <View style={styles.nameContainer}>
                        <TranslatableText data={data.category.name} style={styles.nameText} />
                        <Text style={styles.nameText} > - </Text>
                        <TranslatableText data={data.name} style={styles.nameText} />
                    </View>
                    <View>
                        <MoneyFormatter data={data.price} style={styles.money} />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: API_URL + data.photo }} style={styles.image} />
                </View>
            </View>
        </TouchableOpacity>
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
        flexDirection: 'row',
    },
    nameContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
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
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    money: {
        fontSize: 15,
        fontWeight: '500',
    },
});
