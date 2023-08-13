import React, { useMemo } from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from "@freakycoder/react-native-bounceable";
import FastImage from 'react-native-fast-image'
import { createImageProgress } from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import TranslatableText from "../Common/TranslatableText";
import ProductClass, {TYPE_FIXED, TYPE_WEIGHTABLE, TYPE_WITH_OPTIONS} from "../../classes/Product";
import { API_URL, COLOR_PRIMARY } from "../../constants";
import MoneyFormatter from "../Common/MoneyFormatter";
import LangAwareView from "../Common/LangAwareView";
import {useDispatch, useLang, useSelector} from "../../store/hooks";
import QuantityButton from "../Common/QuantityButton";
import {
    changeShop,
    createChoiceTypeFixed,
    deleteChoiceTypeWithOptions,
    emptyCart,
    setCartShop
} from "../../store/actions/cart";
import {translate} from "../../i18n";
import index from "../../api/service";
import Shop from "../../classes/Shop";
import {useQuery} from "react-query";
import {alertNetworkError} from "../../support/alert";

const Image = createImageProgress(FastImage);

interface ProductProps {
    data: ProductClass
}

export default function Product({ data }: ProductProps): JSX.Element {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { selectedLangWriteFrom, selectedLang } = useLang();
    const shopId = data.category.shop_id;
    const { data: services } = useQuery('service.index', index, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }
        },
    });
    const shops = services.map(service => service.shops).flat();

    const { productCount, choices, hasDifferentOptions = false } = useSelector(state => {
        if (data.type === TYPE_FIXED || data.type === TYPE_WEIGHTABLE) {
            const fixedProduct = state.Cart.choices
                    .find(productInfo => productInfo.product_id === data.id) ||
                { product_count: 0 };
            return { productCount: fixedProduct.product_count, choices: state.Cart.choices };
        }

        if (data.type === TYPE_WITH_OPTIONS) {
            const choices = state.Cart.choices.filter(element => element.product_id === data.id);
            if (0 === choices.length) {
                return { productCount: 0, choices: state.Cart.choices };
            }

            let productCount = 0;
            let hasDifferentOptions = false;
            let productIdInCart;
            for (let choice of choices) {
                productCount += choice.product_count;
                if (productIdInCart && productIdInCart !== choice.id_in_cart) {
                    hasDifferentOptions = true;
                }
                productIdInCart = choice.id_in_cart;
            }
            return { productCount, choices: state.Cart.choices, hasDifferentOptions };
        }
    });

    const onPress = () => {
        const addedValue = data.type === TYPE_WEIGHTABLE ? 200 : 1;
        quantityButtonOnClick(productCount + addedValue, addedValue);
    };

    const quantityButtonOnClick = (newValue, addedValue) => {
        let theOtherShopId : number|undefined;
        for (let choice of choices) {
            if (choice.shop_id !== shopId) {
                theOtherShopId = choice.shop_id;
                break;
            }
        }

        if (! theOtherShopId) {
            return quantityButtonOnClickHandler(newValue, addedValue);
        }

        const shop = shops.filter((shop: Shop) => shop.id === theOtherShopId).pop();
        const shopName = shop.description[selectedLang];

        Alert.alert(
            translate('cart:empty:confirm:title', selectedLang),
            translate('cart:empty:confirm:content', selectedLang, { shopName }),
            [
                {
                    text: translate('common:confirm', selectedLang),
                    style: 'destructive',
                    onPress: () => {
                        dispatch(changeShop(shopId));
                        quantityButtonOnClickHandler(newValue, addedValue);
                    },
                },
                {
                    text: translate('common:cancel', selectedLang),
                    style: 'cancel',
                },
            ],
            { cancelable: true, },
        );
    };

    const quantityButtonOnClickHandler = (newValue, addedValue) => {
        if (data.type === TYPE_FIXED || data.type === TYPE_WEIGHTABLE) {
            return dispatch(createChoiceTypeFixed({ product_id: data.id, product_count: newValue, shop_id: shopId }));
        }

        if (data.type === TYPE_WITH_OPTIONS) {
            if (addedValue > 0) {
                navigation.navigate('ProductWithOptions', { product: data });
            }

            if (addedValue < 0 && ! hasDifferentOptions) {
                return dispatch(createChoiceTypeFixed({ product_id: data.id, product_count: newValue, shop_id: shopId }));
            }
//            return dispatch(showProductDeleteDialog(product)); // TODO: implement
        }
    };

    const imageStyle = useMemo(() => {
        const dynamicStyle = (selectedLangWriteFrom === 'left' ?
            { borderTopRightRadius: 20, borderBottomRightRadius: 20, } :
            { borderTopLeftRadius: 20, borderBottomLeftRadius: 20, }
        );
        return { ...styles.image, ...dynamicStyle, };
    }, [selectedLangWriteFrom]);

    let productName = [ translate(data.category.name, selectedLang), '-', translate(data.name, selectedLang) ];

    return (
        <RNBounceable onPress={onPress}>
            <LangAwareView style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={{ ...styles.nameText, textAlign: selectedLangWriteFrom }} >{productName.join(' ')}</Text>
                    <LangAwareView>
                        <MoneyFormatter data={data.price} style={styles.money} />
                        {data.type !== TYPE_WEIGHTABLE ? '' : <>
                            <Text style={styles.money}> / </Text>
                            <TranslatableText data={'common:kg'} style={styles.money} />
                        </>}
                    </LangAwareView>
                    <QuantityButton key={"product-quantity-button-" + data.id}
                                    data={productCount}
                                    onPress={quantityButtonOnClick}
                                    forWeight={data.type === TYPE_WEIGHTABLE}/>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: API_URL + data.photo }}
                           style={styles.image}
                           imageStyle={imageStyle}
                           renderIndicator={() => <Progress.Circle size={100} fill={'white'} thickness={15} showsText color={COLOR_PRIMARY} borderWidth={0} />}
                    />
                </View>
            </LangAwareView>
        </RNBounceable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        borderRadius: 20,
        margin: 5,
    },
    nameContainer: {
        flexWrap: 'wrap',
    },
    nameText: {
        fontSize: 18,
    },
    textContainer: {
        padding: 10,
        flexBasis: 1,
        flexGrow: 1,
        gap: 5,
    },
    imageContainer: {
        flexBasis: 1,
        flexGrow: 1,
    },
    image: {
        minHeight: 130,
        width: '100%',
    },
    money: {
        fontSize: 20,
        fontWeight: '500',
    },
});
