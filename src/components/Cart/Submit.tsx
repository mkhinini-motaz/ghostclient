import React from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import ButtonField from "../Form/ButtonField";
import {translate} from "../../i18n";
import {emptyCart} from "../../store/actions/cart";
import {useDispatch, useLang, useSelector} from "../../store/hooks";
import {useMutation, useQuery} from "react-query";
import {create} from "../../api/order";
import index from "../../api/service";
import Shop from "../../classes/Shop";
import {COLOR_PRIMARY} from "../../constants";
import {cartReducerDataToOrderSubmitData} from "../../support/api";
import { useNavigation } from '@react-navigation/native';
import {
    alertConfirmOrderSubmit,
    alertEmptyCartConfirm,
    alertNetworkError,
    alertPromptLocation, alertShopClosed
} from "../../support/alert";

interface MapProps {
}

export default function Submit({}: MapProps): JSX.Element {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { selectedLang } = useLang();
    const cartContents = useSelector((state) => state.Cart);

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
    const shop = shops.filter((shop: Shop) => shop.id === cartContents.shopId).pop();
    const shopName = shop.description[selectedLang];

    const { mutate, isLoading } = useMutation({
        mutationFn: create,
        onSuccess: () => {
            dispatch(emptyCart());
            navigation.navigate('OrdersScreen'); // TODO: implement
        },
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }

            const errors = error.response.data.errors;
            if (errors.shop) {
                alertShopClosed(selectedLang);
                return;
            }
        }
    });

    const onEmptyCartPress = () => {
        alertEmptyCartConfirm(selectedLang, shopName, () => dispatch(emptyCart()));
    };

    const onSubmitPress = () => {
        if (! cartContents.address.lat || ! cartContents.address.lng) {
            alertPromptLocation(selectedLang, shopName, () => navigation.navigate('MapScreen'));
            return;
        }

        const now = Date.now();
        const start = shop.working_hours_today[0];
        const end = shop.working_hours_today[1];
        if (now > start && end > now) {
            alertShopClosed(selectedLang);
            return;
        }

        alertConfirmOrderSubmit(selectedLang, shopName, () => mutate(cartReducerDataToOrderSubmitData(cartContents)));
    };

    return (
        <View style={styles.container}>
            <View>
                {isLoading ?
                    <ActivityIndicator size={'large'} color={COLOR_PRIMARY} /> :
                    <ButtonField label={'cart:order:submit'} onPress={onSubmitPress} buttonType={'contained'} />
                }
            </View>
            <View style={styles.emptyCartContainer}>
                <ButtonField label={'cart:empty:action'} onPress={onEmptyCartPress} buttonType={'outlined'} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        gap: 10,
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
    text: {
        fontSize: 18,
    },
    emptyCartContainer: {
        alignItems: 'center',
        alignSelf: 'center',
    }
});
