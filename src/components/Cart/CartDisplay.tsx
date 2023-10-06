import React, {memo} from 'react';
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {CART_DISPLAY_HEIGHT, COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import {useCartData, useSelector} from "../../store/hooks";
import {choicesCount} from "../../classes/Choice";
import LangAwareView from "../Common/LangAwareView";
import {productPrice} from "../../classes/Product";
import MoneyFormatter from "../Common/MoneyFormatter";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";

interface CartDisplayProps {

}

function CartDisplay({}: CartDisplayProps): JSX.Element {
    const navigation = useNavigation();
    const { choices, products, promoCode } = useCartData();
    const count = choicesCount(choices);
    let totalProducts = 0;
    for (let choice of choices) {
        const product = products.filter(product => product.id === choice.product_id)
            .shift();
        if (! product) {
            continue;
        }
        totalProducts += productPrice(product, choice.product_count, choice.options);
    }

    const { delivery_fee: deliveryFee, service_fee: serviceFee } = useSelector(state => state.Cart.serviceArea);

    const totalToPay = totalProducts + serviceFee + deliveryFee - (! promoCode?.id ? 0 : - promoCode.reduction_amount);

    const navigateToCart = () => navigation.navigate('CartNavigator');

    if (count === 0) {
        return '';
    }

    return (
        <View style={styles.container}>
            <LangAwareView style={styles.subContainer}>

                <RNBounceable onPress={navigateToCart}>
                    <View style={styles.countContainer}>
                        <Text style={styles.countText}>{count}</Text>
                    </View>
                </RNBounceable>

                <RNBounceable onPress={navigateToCart}>
                    <View style={styles.iconContainer}>
                        <Icon name={'shoppingcart'} size={50} color={'white'} />
                    </View>
                </RNBounceable>

                <RNBounceable onPress={navigateToCart}>
                    <View style={styles.moneyContainer}>
                        {0 >= totalProducts ? '' :
                            <MoneyFormatter data={totalToPay} style={styles.money} />
                        }
                    </View>
                </RNBounceable>
            </LangAwareView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        bottom: 10,
        height: CART_DISPLAY_HEIGHT,
        width: '100%',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        borderRadius: 20,
    },
    subContainer: {
        backgroundColor: COLOR_PRIMARY + '88',
        borderRadius: 20,
        height: '100%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    countContainer: {
        backgroundColor: COLOR_SECONDARY,
        borderRadius: 10,
        padding: 10,
    },
    countText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '600',
    },
    iconContainer: {
        borderRadius: 10,
        padding: 7,
    },
    moneyContainer: {
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 10,
        padding: 7,
    },
    money: {
        color: 'white',
        fontSize: 25,
        fontWeight: '700',
    },
});

export default memo(CartDisplay);
