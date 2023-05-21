import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LangAwareView from "../Common/LangAwareView";
import MoneyFormatter from "../Common/MoneyFormatter";
import Choice from "../../classes/Choice";
import Product, { productPrice } from "../../classes/Product";
import TranslatableText from "../Common/TranslatableText";
import PromoCode from "../../classes/PromoCode";
import { COLOR_PRIMARY } from "../../constants";

interface TotalProps {
    data: Choice[],
    products: Product[],
    promoCode?: PromoCode,
}

export default function Total({ data, products, promoCode }: TotalProps): JSX.Element {
    let totalProducts = 0;
    for (let choice of data) {
        const product = products.filter(product => product.id === choice.product_id)
            .shift();
        if (! product) {
            continue;
        }
        totalProducts += productPrice(product, choice.product_count, choice.options);
    }

    return (
        <View style={styles.container}>
            <LangAwareView style={styles.totalContainer}>
                <TranslatableText data={'form:total:label'} style={styles.text} />
                <Text style={styles.text} >:</Text>
                <MoneyFormatter data={totalProducts} style={styles.money} />
            </LangAwareView>

            {! promoCode?.id ? '' :
                <LangAwareView style={styles.totalContainer}>
                    <TranslatableText data={'cart:promo_code:label'} style={styles.promoCode} />
                    <Text style={styles.promoCode} >:</Text>
                    <MoneyFormatter data={- promoCode.reduction_amount} style={styles.promoCode} />
                </LangAwareView>
            }

            <LangAwareView style={styles.totalContainer}>
                <TranslatableText data={'cart:service_fee:label'} style={styles.text} />
                <Text style={styles.text} >:</Text>
                {/* TODO: make service fee dynamic */}
                <MoneyFormatter data={500} style={styles.money} />
            </LangAwareView>

            <LangAwareView style={styles.totalContainer}>
                <TranslatableText data={'cart:delivery:label'} style={styles.text} />
                <Text style={styles.text} >:</Text>
                {/* TODO: make delivery fee dynamic */}
                <MoneyFormatter data={2000} style={styles.money} />
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
        fontSize: 18,
        color: COLOR_PRIMARY,
    },
    money: {
        fontSize: 18,
        fontWeight: '500',
    },
    totalContainer: {
        gap: 5,
    }
});
