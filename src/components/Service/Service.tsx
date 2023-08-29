import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from "@freakycoder/react-native-bounceable";

import ServiceClass, {serviceIsOpen} from "../../classes/Service";
import {API_URL, COLOR_PRIMARY} from "../../constants";
import TranslatableText from "../Common/TranslatableText";
import {useLang, useSelector} from "../../store/hooks";

interface ServiceProps {
    data: ServiceClass,
}

export default function Service(props: ServiceProps): JSX.Element {
    const navigation = useNavigation();
    const { data } = props;
    const { selectedLangWriteFrom } = useLang();
    const { choices } = useSelector((state) => state.Cart);

    const shopIds = data.shops.map(shop => shop.id);
    let countInCart = 0;
    for (let choice of choices) {
        if (-1 !== shopIds.indexOf(choice.shop_id)) {
            countInCart++;
        }
    }

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

                {countInCart === 0 ? '' :
                    <View style={{ ...styles.badge, [selectedLangWriteFrom]: -10 }}>
                        <Text style={styles.badgeText}>{countInCart}</Text>
                    </View>
                }

                {serviceIsOpen(data) ? '' :
                    <View style={{ ...styles.closedContainer, transform: [{ rotate: (selectedLangWriteFrom === 'left' ? '' : '-') + '45deg'}]}}>
                        <TranslatableText data={'common:closed'} style={styles.closedText} />
                    </View>
                }
            </View>
        </RNBounceable>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 8,
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
        fontSize: 28,
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
    badge: {
        position: 'absolute',
        backgroundColor: COLOR_PRIMARY,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        top: -10,
    },
    badgeText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    closedContainer: {
        position: 'absolute',
        zIndex: 2,
        backgroundColor: '#33333399',
        padding: 5,
        marginTop: 60,
        marginLeft: -25,
        width: '129%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closedText: {
        color: 'white',
        fontSize: 27,
        fontWeight: '600',
    },
});
