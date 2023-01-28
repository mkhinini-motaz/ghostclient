import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ServiceClass from "../../classes/Service";
import {API_URL, COLOR_PRIMARY} from "../../constants";

interface ServiceProps {
    data: ServiceClass,
}

export default function Service(props: ServiceProps): JSX.Element {
    const { data } = props;
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ShopList', { service: data })}>
            <View style={styles.container} >
                <Text style={styles.text}>{data.name.fr}</Text>
                <Image source={{ uri: API_URL + data.photo }} style={styles.image} />
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
    text: {
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
