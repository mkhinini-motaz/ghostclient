import React from 'react';
import {StyleSheet, View} from 'react-native';
import ShopList from "../components/Shop/ShopList";
import ServiceClass from "../classes/Service";

interface ShopListScreenProps {
    service: ServiceClass,
}

export default function ShopListScreen(props: ShopListScreenProps): JSX.Element {
    return (
        <View>
            <ShopList data={props.route.params.service.shops} />
        </View>
    );
};

const styles = StyleSheet.create({});
