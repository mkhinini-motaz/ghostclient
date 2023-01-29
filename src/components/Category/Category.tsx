import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CategoryClass from "../../classes/Category";
import TranslatableText from "../Common/TranslatableText";
import Product from "../Product/Product";
import {COLOR_PRIMARY} from "../../constants";

interface CategoryProps {
    data: CategoryClass,
}

export default function Category({ data }: CategoryProps): JSX.Element {
    return (
        <View style={styles.container}>
            <TranslatableText data={data.name} style={styles.title} />
            {data.products.map(product => <Product key={'product_' + product.id} data={product} />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: 'grey',
        borderWidth: 3,
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 20,
        color: COLOR_PRIMARY,
    },
});
