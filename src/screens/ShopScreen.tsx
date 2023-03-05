import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {useQuery} from "react-query";
import category from "../api/shop";
import CategoryList from "../components/Category/CategoryList";

interface ShopScreenProps {
    route: any,
}

export default function ShopScreen({ route }: ShopScreenProps): JSX.Element {
    const { isLoading, error, data } = useQuery(['shop.category', route.params.shopId], category(route.params.shopId));
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
