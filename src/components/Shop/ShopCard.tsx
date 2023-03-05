import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import ShopClass from "../../classes/Shop";
import {API_URL, COLOR_PRIMARY} from "../../constants";

interface ShopProps {
    data: ShopClass,
    navigation: any,
}

export default function ShopCard(props: ShopProps): JSX.Element {
    const { data } = props;
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Shop', { shopId: data.id })}>
            <View style={styles.container}>
                <Text>{data.id}</Text>
                <Text style={styles.title}>{data.name}</Text>
                <Text>{data.description.fr}</Text>
                <FastImage source={{ uri: API_URL + data.photo }} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: 250,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
    },
    title: {
        fontSize: 30,
        color: COLOR_PRIMARY,
        textAlign: 'center',
    },
    image: {
        height: 150,
        width: '95%',
        margin: 5,
    },
});
