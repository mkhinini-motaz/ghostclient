import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ShopClass from "../../classes/Shop";
import ShopCard from "./ShopCard";
import CartDisplay from "../Cart/CartDisplay";
import {DEFAULT_QUANTITY} from "../../classes/Option";
import {CART_DISPLAY_HEIGHT} from "../../constants";

interface ShopListProps {
    data: ShopClass[],
}

export default function ShopList(props: ShopListProps): JSX.Element {
    const { data } = props;

    return (
        <View style={{ height: '100%' }}>
            <CartDisplay />
            <ScrollView>
                <View style={styles.container}>
                    {data.map(shop => <ShopCard key={'shop_' + shop.id} data={shop} />)}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        paddingBottom: CART_DISPLAY_HEIGHT + 15,
    },
});
