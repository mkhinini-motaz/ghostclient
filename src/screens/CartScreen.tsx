import React, {useCallback} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { product } from "../api/shop";
import { useQuery } from "react-query";
import { useSelector } from "../store/hooks";
import EmptyCart from "../components/Cart/EmptyCart";
import Choices from "../components/Cart/Choices";
import PromoCode from "../components/Cart/PromoCode";
import Total from "../components/Cart/Total";
import Type from "../components/Cart/Type";
import Map from "../components/Cart/Map";
import AdditionalNote from "../components/Cart/AdditionalNote";

interface CartScreenProps {
    route: any,
}

export default function CartScreen({ route }: CartScreenProps): JSX.Element {
    const { choices, promoCode } = useSelector((state) => state.Cart);
    const productIds = choices.map(choice => choice.product_id);
    const productCallback = useCallback(product(productIds), [productIds.join(',')]);
    const { isLoading, error, data = [] } = useQuery(['shop.product', productIds.join(',')], productCallback, { enabled: choices.length > 0 });

    if (choices.length === 0) {
        return <EmptyCart />;
    }

    if (isLoading) {
        return (
            <Text>Loading ...</Text>
        );
    }

    if (error) {
        return (
            <Text>{JSON.stringify(error)}</Text>
        );
    }

    let shops = {};
    for (let choice of choices) {
        shops[choice.shop_id] = shops[choice.shop_id] || [];
        shops[choice.shop_id].push(choice);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {Object.keys(shops).map((shopId) => {
                    return (
                        <View key={'shop_' + shopId}>
                            <Text>{'shop : ' + shopId}</Text>
                            <Choices
                                data={shops[shopId]}
                                products={data}
                            />
                        </View>
                    );
                })}
                <PromoCode />
                <Total data={choices} products={data} promoCode={promoCode} />
                <Type />
                <Map />
                <AdditionalNote />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 110
    }
});
