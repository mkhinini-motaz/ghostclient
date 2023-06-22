import React, {useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {useQuery} from "react-query";
import { category }from "../api/shop";
import CategoryList from "../components/Category/CategoryList";
import {useDispatch, useLang} from "../store/hooks";
import {setCartShop} from "../store/actions/cart";
import FullScreenLoader from "../components/Common/FullScreenLoader";
import {alertNetworkError} from "../support/utils";

interface ShopScreenProps {
    route: any,
}

export default function ShopScreen({ route }: ShopScreenProps): JSX.Element {
    const dispatch = useDispatch();
    const { selectedLang } = useLang();
    const shopId = route.params.shopId;
    const { isLoading, error, data } = useQuery(['shop.category', shopId], category(shopId), {
        onError: (error) => {
        if (error.code === 'ERR_NETWORK') {
            alertNetworkError(selectedLang);
            return;
        }
    },
    });

    useEffect(() => {
        dispatch(setCartShop(shopId));
    }, [shopId, data]);

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (error) {
        // TODO: implement
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
