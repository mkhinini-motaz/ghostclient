import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ShopList from "../components/Shop/ShopList";
import ServiceClass from "../classes/Service";

interface ShopListScreenProps {
    route: any,
}

export default function ShopListScreen({ route }: ShopListScreenProps): JSX.Element {
    return (
        <SafeAreaView>
            <ShopList data={route.params.service.shops} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});
