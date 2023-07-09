import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ProductWithOptions from "../components/Product/ProductWithOptions";
import { useNavigation } from '@react-navigation/native';
import {useLang} from "../store/hooks";
import {translate} from "../i18n";
import {COLOR_PRIMARY} from "../constants";

interface ProductWithOptionsScreenProps {
    route: any,
}

export default function ProductWithOptionsScreen({ route }: ProductWithOptionsScreenProps): JSX.Element {
    const product = route.params.product;
    const navigation = useNavigation();
    const { selectedLang } = useLang();

    useEffect(() => {
        const title = [ translate(product.category.name, selectedLang), '-', translate(product.name, selectedLang), ];

        navigation.setOptions({
            headerTitle: title.join(' '),
            headerTitleStyle: {
                color: COLOR_PRIMARY,
                fontSize: 25,
                fontWeight: '600'
            },
        })
    }, [selectedLang]);

    return (
        <SafeAreaView >
            <ProductWithOptions data={product} onConfirm={() => navigation.goBack()} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});
