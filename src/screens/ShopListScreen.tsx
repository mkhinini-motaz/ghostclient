import React from 'react';
import {StyleSheet, View} from 'react-native';
import ShopList from "../components/Shop/ShopList";
import ServiceClass from "../classes/Service";

interface ShopListScreenProps {
    service: ServiceClass,
    route: any,
}

export default function ShopListScreen({ service, route }: ShopListScreenProps): JSX.Element {
    return (
        <View>
            <ShopList data={route.params.service.shops} />
        </View>
    );
};

const styles = StyleSheet.create({});
