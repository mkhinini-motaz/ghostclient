import React, {useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {useQuery} from "react-query";
import { category }from "../api/shop";
import CategoryList from "../components/Category/CategoryList";
import {useDispatch} from "../store/hooks";
import {setCartShop} from "../store/actions/cart";

interface ShopScreenProps {
    route: any,
}

export default function ShopScreen({ route }: ShopScreenProps): JSX.Element {
    const dispatch = useDispatch();
    const shopId = route.params.shopId;
    const { isLoading, error, data } = useQuery(['shop.category', shopId], category(shopId));

    useEffect(() => {
        dispatch(setCartShop(shopId));// TODO: set shop not shop id
    }, [shopId, data]);

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

    return (
        <View style={styles.container}>
            <CategoryList data={data || []} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});
