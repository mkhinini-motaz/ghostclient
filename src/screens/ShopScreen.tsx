import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useQuery} from "react-query";
import index from "../api/service";
import ServiceList from "../components/Service/ServiceList";
import category from "../api/shop";

interface ShopScreenProps {

}

export default function ShopScreen(props: ShopScreenProps): JSX.Element {
    const { isLoading, error, data } = useQuery('shop.category', category);
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
console.log('#####  : ', data)
    return (
        <ScrollView style={styles.container}>
            <Text>shop show screen</Text>
            {data.map(category => <Text key={'category_' + category.id}>{JSON.stringify(category)}</Text>)}
            <Text>---------------------------------------------</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {},
});
