import React, {useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {useQuery} from "react-query";
import { category }from "../api/shop";
import {useDispatch, useLang} from "../store/hooks";
import FullScreenLoader from "../components/Common/FullScreenLoader";
import {alertNetworkError} from "../support/alert";
import {API_CLIENT_URL, COLOR_PRIMARY} from "../constants";
import axios from "axios";
import ProductList from "../components/Product/ProductList";
import {translate} from "../i18n";

interface ShopScreenProps {
    route: any,
    navigation: any,
}

export default function ProductListScreen({ route, navigation }: ShopScreenProps): JSX.Element {
    const { selectedLang } = useLang();
    const { categoryId, categoryName } = route.params;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: translate(categoryName, selectedLang),
            headerTitleStyle: {
                color: COLOR_PRIMARY,
                fontSize: 25,
                fontWeight: '600'
            },
        });
        }, [selectedLang]);

    const { isLoading, error, data } = useQuery(
        ['category.show', categoryId],
        () => axios.get(API_CLIENT_URL + 'category/' + categoryId + '/product')
            .then(response => response.data.data),
        {
            onError: (error) => {
                if (error.code === 'ERR_NETWORK') {
                    alertNetworkError(selectedLang);
                    return;
                }
            },
        }
    );

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (error) {
        // TODO: implement
        return (
            <Text>{JSON.stringify(error)}</Text>
        );
    }

    // TODO: no results from search

    return (
        <SafeAreaView style={styles.container}>
            <ProductList data={data || []} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    },
});
