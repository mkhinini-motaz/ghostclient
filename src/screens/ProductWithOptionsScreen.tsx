import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import OptionGroups from "../components/Product/OptionGroups";
import { RouteProp } from '@react-navigation/native';

interface ProductWithOptionsScreenProps {
    route: any,
}

export default function ProductWithOptionsScreen({ route }: ProductWithOptionsScreenProps): JSX.Element {
    const product = route.params.product;
    return (
        <ScrollView>
            <OptionGroups data={product.option_groups} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({});
