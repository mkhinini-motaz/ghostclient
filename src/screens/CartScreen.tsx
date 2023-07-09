import React, {useCallback} from 'react';
import {StyleSheet, View, Text, SafeAreaView,} from 'react-native';
import { product } from "../api/shop";
import { useQuery } from "react-query";
import {useLang, useSelector} from "../store/hooks";
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
    const { selectedLang } = useLang();
    const { choices, promoCode } = useSelector((state) => state.Cart);
    const productIds = choices.map(choice => choice.product_id);
    const productCallback = useCallback(product(productIds), [productIds.join(',')]);
    const { isLoading: servicesAreLoading, error: servicesError, data: services } = useQuery('service.index', index, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }
        },
    });
    const { isLoading, error, data = [] } = useQuery(['shop.product', productIds.join(',')], productCallback, {
        enabled: choices.length > 0,
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }
        },
    });

    if (choices.length === 0) {
        return <EmptyCart />;
    }

    if (isLoading || servicesAreLoading) {
        return <FullScreenLoader />;
    }

    if (error || servicesError) {
        return (
            <Text>{JSON.stringify(error)}</Text>
        );
    }

    const shops = services.map(service => service.shops).flat();
    const choicesByShop = {};
    for (let choice of choices) {
        choicesByShop[choice.shop_id] = choicesByShop[choice.shop_id] || [];
        choicesByShop[choice.shop_id].push(choice);
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
                products={data}
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
                    <Total data={choices} products={data} promoCode={promoCode} />
                    <AdditionalNote />
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
