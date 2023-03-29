import React, {useMemo} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Image from "../Common/Image";
import {API_URL} from "../../constants";
import {useDispatch, useLang, useSelector} from "../../store/hooks";
import Product, {productPrice, TYPE_WEIGHTABLE, TYPE_WITH_OPTIONS} from "../../classes/Product";
import LangAwareView from "../Common/LangAwareView";
import TranslatableText from "../Common/TranslatableText";
import MoneyFormatter from "../Common/MoneyFormatter";
import {translate} from "../../i18n";
import QuantityButton from "../Common/QuantityButton";
import ChoiceClass from "../../classes/Choice";
import { createChoiceTypeFixed, deleteChoiceTypeWithOptions, updateCountChoiceTypeWithOptions } from "../../store/actions/cart";
import Option, {optionOutput} from "../../classes/Option";

interface ChoiceProps {
    data: ChoiceClass
    product: Product,
}

export default function Choice({ data, product }: ChoiceProps): JSX.Element {
    const dispatch = useDispatch();
    const { selectedLangWriteFrom, selectedLang } = useLang();
    const productName = [ translate(product.category.name, selectedLang), '-', translate(product.name, selectedLang) ].join(' ');
    const quantity = product.type !== TYPE_WEIGHTABLE ? data.product_count :
        (data.product_count > 999 ?
            [
                (data.product_count / 1000).toString().replace('.', ','),
                translate('common:kg', selectedLang)
            ] :
            [
                data.product_count,
                translate('common:g', selectedLang)
            ]
        ).join(' ');

    const quantityButtonOnClick = newValue => {
        if (newValue === 0) {
            Alert.alert(
                translate('product:delete:confirm:title', selectedLang),
                translate('product:delete:confirm:content', selectedLang),
                [
                    {
                        text: translate('common:confirm', selectedLang),
                        style: 'destructive',
                        onPress: () => {
                            if (product.type === TYPE_WITH_OPTIONS) {
                                return dispatch(deleteChoiceTypeWithOptions(data.id_in_cart));
                            }

                            return dispatch(createChoiceTypeFixed({ product_id: product.id, product_count: newValue, shop_id: product.category.shop_id }));
                        },
                    },
                    {
                        text: translate('common:cancel', selectedLang),
                        style: 'cancel',
                    },
                ],
                { cancelable: true, },
            );
            return
        }

        if (product.type === TYPE_WITH_OPTIONS) {
            return dispatch(updateCountChoiceTypeWithOptions({ product_id_in_cart: data.id_in_cart, product_count: newValue }));
        }
        return dispatch(createChoiceTypeFixed({ product_id: product.id, product_count: newValue, shop_id: product.category.shop_id }))
    };

    return (
        <LangAwareView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: API_URL + product.photo }}
                    style={styles.image}
                    imageStyle={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={{ ...styles.text, textAlign: selectedLangWriteFrom }} >{productName}</Text>
                <LangAwareView>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <Text style={styles.quantity}> - </Text>
                    <MoneyFormatter data={productPrice(product, data.product_count, data.options)} style={styles.money} />
                </LangAwareView>
                <LangAwareView style={styles.quantityContainer}>
                    <LangAwareView >
                        <MoneyFormatter data={product.price} style={styles.money} />
                        {product.type !== TYPE_WEIGHTABLE ? '' : <>
                            <Text style={styles.money}> / </Text>
                            <TranslatableText data={'common:kg'} style={styles.money} />
                        </>}
                    </LangAwareView>
                    <QuantityButton key={"quantity-button-" + data.id}
                                    data={data.product_count}
                                    onPress={quantityButtonOnClick}
                                    forWeight={product.type === TYPE_WEIGHTABLE}
                                    style={{ marginHorizontal: 10 }}
                                    hideCount
                    />
                </LangAwareView>
                {product.type !== TYPE_WITH_OPTIONS ? '' :
                    <View>
                        <Text>
                            {data.options.map(option => optionOutput(option, selectedLang, selectedLangWriteFrom)).join(', ')}
                        </Text>
                    </View>
                }
            </View>
        </LangAwareView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    image: {
        minHeight: 80,
        flex: 1,
        borderRadius: 20,
    },
    imageContainer: {
        padding: 5,
        width: '30%',
    },
    textContainer: {
        padding: 5,
        width: '70%',
    },
    text: {
        fontSize: 17,
        flexWrap: 'wrap',
    },
    quantity: {
        fontSize: 20,
        fontWeight: '500',
    },
    money: {
        fontSize: 18,
        fontWeight: '500',
    },
    quantityContainer: {
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
});
