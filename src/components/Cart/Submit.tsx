import React from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import ButtonField from "../Form/ButtonField";
import {emptyCart} from "../../store/actions/cart";
import {useDispatch, useLang, useSelector} from "../../store/hooks";
import {useMutation, useQuery, useQueryClient} from "react-query";
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
import LangAwareView from "../Common/LangAwareView";

interface MapProps {
}

export default function Submit({}: MapProps): JSX.Element {
    const queryClient = useQueryClient();
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
            queryClient.invalidateQueries('order.index');
            dispatch(emptyCart());
            navigation.navigate('UserNavigator', { screen: 'OrdersScreen' });
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
                    <ButtonField label={'cart:order:submit'} onPress={onSubmitPress} buttonType={'contained'} icon={<Icon name={'shopping-cart'} size={30} color={'white'} />} />
                }
            </View>
            <View style={styles.emptyCartContainer}>
                <ButtonField label={'cart:empty:action'} onPress={onEmptyCartPress} buttonType={'outlined'} icon={<Icon name={'remove-shopping-cart'} size={30} color={COLOR_PRIMARY} />} />
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
