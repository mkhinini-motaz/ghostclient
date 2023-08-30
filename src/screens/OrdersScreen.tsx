import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import { index } from "../api/order";
import {alertNetworkError} from "../support/alert";
import {useLang} from "../store/hooks";
import {useQuery} from "react-query";
import OrderList from "../components/Order/OrderList";
import EmptyOrders from "../components/Order/EmptyOrders";
import FullScreenLoader from "../components/Common/FullScreenLoader";

interface ShopListScreenProps {
    route: any,
}

export default function OrdersScreen({ route }: ShopListScreenProps): JSX.Element {
    const { selectedLang } = useLang();

    const { data, isLoading } = useQuery('order.index', index, {
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }
        },
    });

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (! data || data.length === 0) {
        return (
            <SafeAreaView>
                <EmptyOrders />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <OrderList data={data} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});
