import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Order from "../../classes/Order";
import LangAwareView from "../Common/LangAwareView";
import TranslatableText from "../Common/TranslatableText";
import MoneyFormatter from "../Common/MoneyFormatter";
import {COLOR_SECONDARY} from "../../constants";

interface TotalProps {
    data: Order,
}

function Total({ data }: TotalProps): JSX.Element {
    const { promo_code, total_price, service_fee, delivery_fee } = data;
    const totalToPay = total_price + service_fee + delivery_fee - (! promo_code?.id ? 0 : - promo_code.reduction_amount);

    return (
        <View>
            <LangAwareView style={styles.subContainer}>
                <TranslatableText data={'form:total:label'} style={styles.text} />
                <Text style={styles.text} >:</Text>
                <MoneyFormatter data={total_price} style={styles.money} />
            </LangAwareView>

            {! promo_code?.id ? '' :
                <LangAwareView style={styles.subContainer}>
                    <TranslatableText data={'cart:promo_code:label'} style={styles.promoCode} />
                    <Text style={styles.promoCode} >:</Text>
                    <MoneyFormatter data={- promo_code.reduction_amount} style={styles.promoCode} />
                </LangAwareView>
            }

            <LangAwareView style={styles.subContainer}>
                <TranslatableText data={'cart:service_fee:label'} style={styles.text} />
                <Text style={styles.text} >:</Text>
                <MoneyFormatter data={service_fee} style={styles.money} />
            </LangAwareView>

            <LangAwareView style={styles.subContainer}>
                <TranslatableText data={'cart:delivery:label'} style={styles.text} />
                <Text style={styles.text} >:</Text>
                <MoneyFormatter data={delivery_fee} style={styles.money} />
            </LangAwareView>

            <LangAwareView style={styles.totalContainer}>
                <TranslatableText data={'form:total_to_pay:label'} style={styles.totalText} />
                <Text style={styles.totalText} >:</Text>
                <MoneyFormatter data={totalToPay} style={styles.totalMoney} />
            </LangAwareView>
        </View>
    );
}

const styles = StyleSheet.create({

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

export default memo(Total);
