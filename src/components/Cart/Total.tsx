import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LangAwareView from "../Common/LangAwareView";
import MoneyFormatter from "../Common/MoneyFormatter";
import Choice from "../../classes/Choice";
import Product, { productPrice } from "../../classes/Product";
import TranslatableText from "../Common/TranslatableText";
import PromoCode from "../../classes/PromoCode";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import {useSelector} from "../../store/hooks";

interface TotalProps {
    choices: Choice[],
    products: Product[],
    promoCode?: PromoCode,
}

export default function Total({ choices, products, promoCode }: TotalProps): JSX.Element {
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

    return (
        <View style={styles.container}>
            <LangAwareView style={styles.subContainer}>
                <TranslatableText data={'form:total:label'} style={styles.text} />
                <Text style={styles.text} >:</Text>
                <MoneyFormatter data={totalProducts} style={styles.money} />
            </LangAwareView>

            {! promoCode?.id ? '' :
                <LangAwareView style={styles.subContainer}>
                    <TranslatableText data={'cart:promo_code:label'} style={styles.promoCode} />
                    <Text style={styles.promoCode} >:</Text>
                    <MoneyFormatter data={- promoCode.reduction_amount} style={styles.promoCode} />
                </LangAwareView>
            }

            <LangAwareView style={styles.subContainer}>
                <TranslatableText data={'cart:service_fee:label'} style={styles.text} />
                <Text style={styles.text} >:</Text>
                <MoneyFormatter data={serviceFee} style={styles.money} />
            </LangAwareView>

            <LangAwareView style={styles.subContainer}>
                <TranslatableText data={'cart:delivery:label'} style={styles.text} />
                <Text style={styles.text} >:</Text>
                <MoneyFormatter data={deliveryFee} style={styles.money} />
            </LangAwareView>

            <LangAwareView style={styles.totalContainer}>
                <TranslatableText data={'form:total_to_pay:label'} style={styles.totalText} />
                <Text style={styles.totalText} >:</Text>
                <MoneyFormatter data={totalToPay} style={styles.totalMoney} />
            </LangAwareView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    text: {
        fontSize: 18,
    },
    promoCode: {
        fontSize: 22,
        fontWeight: '500',
        color: COLOR_SECONDARY,
    },
    money: {
        fontSize: 18,
        fontWeight: '500',
    },
    subContainer: {
        gap: 5,
    },
    totalContainer: {
        marginTop: 5,
        gap: 5,
    },
    totalText: {
        fontSize: 22,
        fontWeight: '500',
    },
    totalMoney: {
        fontSize: 22,
        fontWeight: '700',
    },
});
