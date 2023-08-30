import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import ShopClass from "../../classes/Shop";
import {API_URL, COLOR_PRIMARY} from "../../constants";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import TranslatableText from "../Common/TranslatableText";

interface ShopProps {
    data: ShopClass,
    navigation: any,
}

export default function ShopCard(props: ShopProps): JSX.Element {
    const { data } = props;
    const navigation = useNavigation();

    return (
        <RNBounceable onPress={() => navigation.navigate('Shop', { shopId: data.id })}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <View style={styles.textBackground}>
                        <TranslatableText style={styles.text} data={data.name} />
                    </View>
                </View>

                <Image source={{ uri: API_URL + data.photo }} style={styles.image} imageStyle={styles.image} />
            </View>
        </RNBounceable>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 8,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        borderRadius: 20,
    },
    title: {
        fontSize: 30,
        color: COLOR_PRIMARY,
        textAlign: 'center',
    },
    image: {
        height: 150,
        width: '100%',
        borderRadius: 20,
    },
    textContainer: {
        position: 'absolute',
        zIndex: 2,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    textBackground: {
        backgroundColor: '#33333366',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingVertical: 5,
    },
    text: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fefefe',
        textAlign: 'center',
    },
});
