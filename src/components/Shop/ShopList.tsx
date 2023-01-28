import React from 'react';
import {StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ShopClass from "../../classes/Shop";
import Shop from "./Shop";

interface ShopListProps {
    data: ShopClass[],
}

export default function ShopList(props: ShopListProps): JSX.Element {
    const navigation = useNavigation();
    const { data } = props;

    if (data.length === 1) {
        navigation.replace('Shop', { shopId: data[0].id });
    }

    return (
        <View style={styles.container}>
            {data.map(shop => <Shop key={'shop_' + shop.id} data={shop} />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
    },
});
