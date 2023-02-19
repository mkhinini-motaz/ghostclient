import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ServiceClass from "../../classes/Service";
import {API_URL, COLOR_PRIMARY} from "../../constants";
import TranslatableText from "../Common/TranslatableText";

interface ServiceProps {
    data: ServiceClass,
}

export default function Service(props: ServiceProps): JSX.Element {
    const { data } = props;
    const navigation = useNavigation();

    const navigate = () => {
        if (data.shops.length === 1) {
            navigation.navigate('Shop', { shopId: data.shops[0].id });
        } else {
            navigation.navigate('ShopList', { service: data });
        }
    };

    return (
        <TouchableOpacity onPress={navigate}>
            <View style={styles.container} >
                <View style={styles.textContainer}>
                    <TranslatableText style={styles.text} data={data.name} />
                </View>
                <Image source={{ uri: API_URL + data.photo }} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: 250,
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
    textContainer: {
        position: 'absolute',
        zIndex: 2,
        padding: 5,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#33333366',
        borderRadius: 20,
    },
    image: {
        flexGrow: 1,
        width: '100%',
        resizeMode: 'stretch',
        borderRadius: 20,
    },
});
