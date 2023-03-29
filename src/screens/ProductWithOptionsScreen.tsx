import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ProductWithOptions from "../components/Product/ProductWithOptions";
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {useLang, useSelector} from "../store/hooks";
import {translate} from "../i18n";
import {COLOR_PRIMARY} from "../constants";

interface ProductWithOptionsScreenProps {
    route: any,
}

export default function ProductWithOptionsScreen({ route }: ProductWithOptionsScreenProps): JSX.Element {
    const product = route.params.product;
    const navigation = useNavigation();
    const { selectedLang, selectedLangWriteFrom } = useLang();

    useEffect(() => {
        const title = [
            translate(route.params.product.category.name, selectedLang),
            '-',
            translate(route.params.product.name, selectedLang),
        ];

        navigation.setOptions({
            title: title.join(' '),
            headerTitleStyle: {
                color: COLOR_PRIMARY,
                fontSize: 25,
                fontWeight: '600'
            },
        })
    }, [selectedLang]);

    return (
        <View style={{ paddingBottom: 50 }}>
            <ProductWithOptions data={product} onConfirm={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({});
