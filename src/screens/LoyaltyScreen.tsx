import React from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {useLang, useSetClient} from "../store/hooks";
import LoyaltyPoints from "../components/Loyalty/LoyaltyPoints";
import PromoCodeShop from "../components/Loyalty/PromoCodeShop";
import AvailablePromoCodes from "../components/Loyalty/AvailablePromoCodes";
import LoyaltyActions from "../components/Loyalty/LoyaltyActions";
import {useQuery} from "react-query";
import {profile} from "../api/auth";
import FullScreenLoader from "../components/Common/FullScreenLoader";
import {alertNetworkError} from "../support/alert";

export default function LoyaltyScreen({ navigation }): JSX.Element {
    const setClient = useSetClient();
    const { selectedLang } = useLang();
    const { isLoading } = useQuery('profile', profile, {
        onSuccess: (data) => setClient(data),
        onError: (error) => {
        if (error.code === 'ERR_NETWORK') {
            alertNetworkError(selectedLang);
            return;
        }
    },
    });

    if (isLoading) {
        return <FullScreenLoader />
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <LoyaltyPoints />
                    <PromoCodeShop />
                    <AvailablePromoCodes />
                    <LoyaltyActions />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        gap: 20
    },
});
