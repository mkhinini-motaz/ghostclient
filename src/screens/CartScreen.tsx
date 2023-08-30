import React, {useCallback} from 'react';
import {StyleSheet, View, Text, SafeAreaView,} from 'react-native';
import { product } from "../api/shop";
import { useQuery } from "react-query";
import {useCartData, useLang, useSelector} from "../store/hooks";
import EmptyCart from "../components/Cart/EmptyCart";
import Choices from "../components/Cart/Choices";
import PromoCode from "../components/Cart/PromoCode";
import Total from "../components/Cart/Total";
import Type from "../components/Cart/Type";
import Map from "../components/Cart/Map";
import AdditionalNote from "../components/Cart/AdditionalNote";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FullScreenLoader from "../components/Common/FullScreenLoader";
import index from "../api/service";
import TranslatableText from "../components/Common/TranslatableText";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../constants";
import Submit from "../components/Cart/Submit";
import {alertNetworkError} from "../support/alert";

interface CartScreenProps {
    route: any,
    navigation: any,
}

export default function CartScreen({ route, navigation }: CartScreenProps): JSX.Element {
    const { choices, promoCode, productsAreLoading, productsError, products, shops, servicesAreLoading, servicesError, choicesByShop } = useCartData();
    if (choices.length === 0) {
        return <EmptyCart />;
    }

    if (productsAreLoading || servicesAreLoading) {
        return <FullScreenLoader />;
    }

    if (productsError || servicesError) {
        // tODO: implement
        return (
            <Text>{JSON.stringify(productsError)}</Text>
        );
    }

    const choicesOutput = [];
    for (let shop of shops) {
        if (! choicesByShop[shop.id]) {
            continue;
        }
        choicesOutput.push(<View key={'shop_' + shop.id}>
            <View style={styles.shopDescriptionContainer}>
                <TranslatableText data={shop.description} style={styles.shopDescription} />
            </View>
            <Choices
                data={choicesByShop[shop.id]}
                products={products}
            />
        </View>);
    }

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView style={{ height: '100%' }}>
                <View style={styles.container}>
                    {choicesOutput}
                    <PromoCode />
                    <Map />
                    <AdditionalNote />
                    <Total choices={choices} products={products} promoCode={promoCode} />
                    <Submit />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20
    },
    shopDescriptionContainer: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: COLOR_PRIMARY + 'aa',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    shopDescription: {
        fontSize: 25,
        fontWeight: '500',
        color: 'white',
    },
});
