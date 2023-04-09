import React, {memo} from 'react';
import {Text, StyleSheet, View, Alert, ActivityIndicator} from 'react-native';
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import TranslatableText from "../Common/TranslatableText";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import MoneyFormatter from "../Common/MoneyFormatter";
import LangAwareView from "../Common/LangAwareView";
import {useClient, useLang} from "../../store/hooks";
import {translate} from "../../i18n";
import {useMutation} from "react-query";
import {createPromoCode} from "../../api/loyalty";

interface PromoCodeShopItemProps {
    points: number,
    money: number,
}

function PromoCodeShopItem({ points, money }: PromoCodeShopItemProps): JSX.Element {
    const client = useClient();
    const { selectedLang } = useLang();

    const { mutate, isLoading } = useMutation({ mutationFn: createPromoCode, });

    const onPress = () => {
        if (points > client.loyalty_points_count) {
            Alert.alert('', translate('promo_code:create:points:max', selectedLang), [{ text: translate('common:ok', selectedLang), }]);
            return;
        }

        Alert.alert(
            translate('promo_code:create', selectedLang),
            translate('promo_code:create:confirm:content', selectedLang, { points }),
            [
                {
                    text: translate('common:confirm', selectedLang),
                    style: 'destructive',
                    onPress: () => { mutate(points) },
                },
                {
                    text: translate('common:cancel', selectedLang),
                    style: 'cancel',
                },
            ],
            { cancelable: true, },
        );
    };
    return (
        <View style={styles.container}>
            {isLoading ?
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="large" color={COLOR_PRIMARY} animating={isLoading} />
                </View> : <>
                    <RNBounceable onPress={onPress} >
                        <LangAwareView style={styles.buttonSecondary}>
                            <Text style={styles.text} > {points} </Text>
                            <TranslatableText style={styles.text} data={'loyalty:points'} />
                        </LangAwareView>
                    </RNBounceable>
                    <RNBounceable onPress={onPress} >
                        <View style={styles.buttonPrimary}>
                            <MoneyFormatter data={money} style={styles.text} />
                        </View>
                    </RNBounceable>
                </>
            }
        </View>
    );
}

const buttonStyle = {
    borderRadius: 20,
    padding: 10,
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        gap: 10,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        flexGrow: 1,
    },
    activityIndicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPrimary: {
        ...buttonStyle,
        backgroundColor: COLOR_PRIMARY,
    },
    buttonSecondary: {
        ...buttonStyle,
        backgroundColor: COLOR_SECONDARY,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
});

export default memo(PromoCodeShopItem);
