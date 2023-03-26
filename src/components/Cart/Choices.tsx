import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from "../../store/hooks";
import Product, {TYPE_WITH_OPTIONS} from "../../classes/Product";
import Choice from "./Choice";
import ChoiceClass from "../../classes/Choice";

interface ChoicesProps {
    data: ChoiceClass[],
    products: Product[],
}

export default function Choices({ data, products }: ChoicesProps): JSX.Element {
    let components = [];
    for (let choice of data) {
        const product = products.filter(product => product.id === choice.product_id).shift();
        if (! product) {
            continue;
        }

        const productKey = 'choice-' + product.id + (product.type === TYPE_WITH_OPTIONS ? '-' + choice.id_in_cart : '');
        components.push(<Choice key={productKey}
                                product={product}
                                data={choice}
        />);

    }

    return (
        <View style={styles.container}>
            {components}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
});
