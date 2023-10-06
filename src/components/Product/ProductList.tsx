import React, {memo, useCallback} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {CART_DISPLAY_HEIGHT} from "../../constants";
import ProductClass from "../../classes/Product";
import Product from "./Product";
import CartDisplay from "../Cart/CartDisplay";
import CategoryCard from "../Category/CategoryCard";

interface ProductListProps {
    data: ProductClass,
}

function ProductList({ data }: ProductListProps): JSX.Element {
    const renderVerticalItem = useCallback(({ item }) => <Product key={'product_' + item.id} data={item} />, []);
    const verticalKeyExtractor = useCallback(product => 'product_show_' + product.id, []);

    return (
        <View style={{ position: 'relative' }}>
            <CartDisplay />
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: CART_DISPLAY_HEIGHT + 15 }}>
                    {data.map(product =>
                        <Product key={'product_' + product.id} data={product} style={{ width: data.length > 3 ? '45%' : '95%', marginHorizontal: '2%', }} />
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({});

export default memo(ProductList);
