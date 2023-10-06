import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-vector-icons/MaterialIcons";
import OrderClass from "../../classes/Order";
import LangAwareView from "../Common/LangAwareView";
import TranslatableText from "../Common/TranslatableText";
import {formatDateTime} from "../../support/utils";
import Choice from "./Choice";
import ChoiceClass from "../../classes/Choice";
import {COLOR_PRIMARY} from "../../constants";
import Divider from "../Common/Divider";
import Total from "./Total";
import ButtonField from "../Form/ButtonField";
import {useDispatch, useLang} from "../../store/hooks";
import {alertConfirmConfirmOrderReplay} from "../../support/alert";
import {
    changeShop,
    createChoiceTypeFixed,
    createChoiceTypeWithOptions,
    setAdditionalNote,
    setCartAddress
} from "../../store/actions/cart";
import {TYPE_WITH_OPTIONS} from "../../classes/Product";

interface OrderProps {
    data: OrderClass
}

function Order({ data }: OrderProps): JSX.Element {
    const navigation = useNavigation();
    const { selectedLang } = useLang();
    const dispatch = useDispatch();

    const onShopNamePress = () => navigation.navigate('HomeNavigator', { screen: 'Shop', params: { shopId: data.shop.id } });
    const onMapIconPress = () => navigation.navigate('LocationShowMap', { location: {
        latitude: data.delivery_latitude, longitude: data.delivery_longitude
        } });

    const onConfirmReplayOrder = () => {
        dispatch(changeShop(data.shop.id));

        data.choices.forEach((choice: ChoiceClass) => {
            if (choice.product.type === TYPE_WITH_OPTIONS) {
                const choiceToSubmit = (({ product_count, product_id, options }) => ({ product_count, product_id, options, shop_id: data.shop.id }))(choice);
                dispatch(createChoiceTypeWithOptions(choiceToSubmit));
            } else {
                const choiceToSubmit = (({ product_count, product_id }) => ({ product_count, product_id, shop_id: data.shop.id }))(choice);
                dispatch(createChoiceTypeFixed(choiceToSubmit));
            }
        });

        dispatch(setCartAddress({ lat: data.delivery_latitude, lng: data.delivery_longitude}));
        dispatch(setAdditionalNote(data.additional_note));

        navigation.navigate('CartNavigator', { screen: 'MapScreen' });
    };

    const onCartIconPress = () => {
        alertConfirmConfirmOrderReplay(selectedLang, data.shop.description[selectedLang], onConfirmReplayOrder);
    };

    return (
        <View style={styles.container}>
            <LangAwareView style={styles.shopDescriptionContainer}>
                <RNBounceable onPress={onShopNamePress}>
                    <TranslatableText data={data.shop.description} style={styles.shopDescription} />
                </RNBounceable>
                <RNBounceable onPress={onCartIconPress}>
                    <Icon name={'add-shopping-cart'} size={38} color={'white'} />
                </RNBounceable>
            </LangAwareView>

            <View style={styles.subContainer}>
                <LangAwareView style={styles.orderNumAndDataContainer}>
                    <LangAwareView>
                        <TranslatableText data={'common:order'} style={styles.text} />
                        <Text style={styles.text} > : </Text>
                        <Text style={styles.text} >{ String(data.id).slice(-2).padStart(2, '0') }</Text>
                    </LangAwareView>
                    <Text style={styles.text}>{formatDateTime(data.created_at)}</Text>
                </LangAwareView>

                {! data.additional_note ? '' : <>
                    <Divider />
                    <LangAwareView>
                        <Text style={styles.text}>{data.additional_note}</Text>
                    </LangAwareView>
                </>}

                <Divider />

                {! data.delivery_latitude || ! data.delivery_longitude ? '' :
                    <View>
                        <ButtonField label={'common:location:view'} onPress={onMapIconPress} buttonType={'contained'} icon={<Icon name={'location-pin'} size={30} color={'white'} />} />
                    </View>
                }

                <Divider />

                <View>
                    {data.choices.map(choice => <Choice data={choice} key={'order_choice_' + choice.id} />)}
                </View>

                <Divider />

                <Total data={data} />
            </View>
        </View>
    );
}

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
        margin: 10,
    },
    subContainer: {
        gap: 10,
        padding: 10,
    },
    shopDescriptionContainer: {
        padding: 10,
        backgroundColor: COLOR_PRIMARY + 'aa',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    shopDescription: {
        fontSize: 23,
        fontWeight: '700',
        color: 'white',
    },
    orderNumAndDataContainer: {
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 18,
    }
});

export default memo(Order);
