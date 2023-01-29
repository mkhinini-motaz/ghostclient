import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ShopClass from "../../classes/Shop";
import ShopCard from "./ShopCard";

interface ShopListProps {
    data: ShopClass[],
}

export default function ShopList(props: ShopListProps): JSX.Element {
    const { data } = props;

    return (
        <View style={styles.container}>
            {data.map(shop => <ShopCard key={'shop_' + shop.id} data={shop} />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
    },
});
