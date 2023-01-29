import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import TranslatableText from "../Common/TranslatableText";
import ProductClass from "../../classes/Product";
import {API_URL} from "../../constants";
import MoneyFormatter from "../Common/MoneyFormatter";

interface ProductProps {
    data: ProductClass
}

export default function Product({ data }: ProductProps): JSX.Element {
    return (
        <TouchableOpacity>
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
        borderColor: 'blue',
        borderWidth: 3,
        padding: 5,
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
        flexBasis: 1,
        flexGrow: 1,
        gap: 5,
    },
    imageContainer: {
        flexBasis: 1,
        flexGrow: 1,
    },
    image: {
        height: 100,
        width: '95%',
        margin: 5,
    },
    money: {
        fontSize: 15,
        fontWeight: '500',
    },
});
