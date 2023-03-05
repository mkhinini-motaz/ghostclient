import React, { useCallback } from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import CategoryClass from "../../classes/Category";
import TranslatableText from "../Common/TranslatableText";
import Product from "../Product/Product";
import {COLOR_PRIMARY} from "../../constants";

interface CategoryProps {
    data: CategoryClass,
}

export default function Category({ data }: CategoryProps): JSX.Element {
    const renderItem = useCallback(({ item }) => <Product data={item} key={'product_' + item.id} />, []);
    const keyExtractor = useCallback(product => 'product_show_' + product.id, []);
    const getItemLayout = useCallback((data, index) => ({ length: 130, offset: 130 * index, index }), []);

    return (
        <View style={styles.container}>
            <TranslatableText data={data.name} style={styles.title} />
            <FlatList
                maxToRenderPerBatch={5}
                initialNumToRender={5}
                updateCellsBatchingPeriod={100}
                data={data.products}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                getItemLayout={getItemLayout}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 37,
        color: COLOR_PRIMARY,
    },
});
