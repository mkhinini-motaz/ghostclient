import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useQuery} from "react-query";
import index from "../api/service";
import ServiceList from "../components/Service/ServiceList";
import category from "../api/shop";
import Category from "../components/Category/Category";
import CategoryList from "../components/Category/CategoryList";
import {translate} from "../i18n";

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
        <ScrollView style={styles.container}>
            <CategoryList data={data} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {},
});
