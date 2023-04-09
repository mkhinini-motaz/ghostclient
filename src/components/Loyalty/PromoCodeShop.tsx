import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLOR_PRIMARY} from "../../constants";
import TranslatableText from "../Common/TranslatableText";
import {useClient} from "../../store/hooks";
import PromoCodeShopItem from "./PromoCodeShopItem";
import LangAwareView from "../Common/LangAwareView";

interface PromoCodeShopProps {

}

function PromoCodeShop({}: PromoCodeShopProps): JSX.Element {
    const client = useClient();

    const promoCodeShopItemsOutput = [];
    for (let promoCodeValue of client.promoCodeValues) {
        promoCodeShopItemsOutput.push(<PromoCodeShopItem points={promoCodeValue.points} money={promoCodeValue.reduction_amount} key={promoCodeValue.points + '-' + promoCodeValue.reduction_amount} />);
    }

    return (
        <View style={styles.container}>
            <TranslatableText data={'loyalty:promo_code_shop:title'} style={styles.title} />
            <TranslatableText data={'loyalty:promo_code_shop:description'} style={styles.description} />
            <LangAwareView style={styles.promoCodeShopItemsContainer}>
                {promoCodeShopItemsOutput}
            </LangAwareView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        gap: 10,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY,
    },
    description: {
        fontSize: 20,
    },
    promoCodeShopItemsContainer: {
        flexWrap: 'wrap',
        gap: 15,
    },
});

export default memo(PromoCodeShop);
