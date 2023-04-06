import React, {useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {useQuery} from "react-query";
import { category }from "../api/shop";
import CategoryList from "../components/Category/CategoryList";
import {useDispatch} from "../store/hooks";
import {setCartShop} from "../store/actions/cart";
import FullScreenLoader from "../components/Common/FullScreenLoader";

interface ShopScreenProps {
    route: any,
}

export default function ShopScreen({ route }: ShopScreenProps): JSX.Element {
    const dispatch = useDispatch();
    const shopId = route.params.shopId;
    const { isLoading, error, data } = useQuery(['shop.category', shopId], category(shopId));

    useEffect(() => {
        dispatch(setCartShop(shopId));
    }, [shopId, data]);

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (error) {
        return (
            <Text>{JSON.stringify(error)}</Text>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <CategoryList data={data || []} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    },
});
