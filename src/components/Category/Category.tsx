import React, {memo, useCallback} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import CategoryClass from "../../classes/Category";
import TranslatableText from "../Common/TranslatableText";
import Product from "../Product/Product";
import {COLOR_PRIMARY} from "../../constants";

interface CategoryProps {
    data: CategoryClass,
}

function Category({ data }: CategoryProps): JSX.Element {
    return (
        <View style={styles.container}>
            <TranslatableText data={data.name} style={styles.title} />
            {data.products.map(product => <Product key={'product_' + product.id} data={product} />)}

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

export default memo(Category, (prevProps, nextProps) => prevProps.data.id !== nextProps.data.id);
