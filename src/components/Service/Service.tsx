import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from "@freakycoder/react-native-bounceable";

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
        <RNBounceable onPress={navigate}>
            <View style={styles.container} >
                <View style={styles.textContainer}>
                    <View style={styles.textBackground}>
                        <TranslatableText style={styles.text} data={data.name} />
                    </View>
                </View>
                <Image source={{ uri: API_URL + data.photo }} style={styles.image} />
            </View>
        </RNBounceable>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: 170,
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
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
    },
    textBackground: {
        backgroundColor: '#33333366',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        fontSize: 30,
        fontWeight: '700',
        color: '#fefefe',
        textAlign: 'center',
    },
    image: {
        flexGrow: 1,
        width: '100%',
        resizeMode: 'stretch',
        borderRadius: 20,
    },
});
