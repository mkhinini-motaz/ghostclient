import React, {useCallback} from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import I18nSelect from "../components/Common/I18nSelect";
import TranslatableText from "../components/Common/TranslatableText";
import {COLOR_PRIMARY} from "../constants";
import RNBounceable from "@freakycoder/react-native-bounceable";
import {useClient, useSetClient} from "../store/hooks";
import {setClientToken} from "../support/auth";
import LoyaltyPoints from "../components/Loyalty/LoyaltyPoints";
import PromoCodeShop from "../components/Loyalty/PromoCodeShop";
import AvailablePromoCodes from "../components/Loyalty/AvailablePromoCodes";
import LoyaltyActions from "../components/Loyalty/LoyaltyActions";
import {useQuery} from "react-query";
import {profile} from "../api/auth";
import FullScreenLoader from "../components/Common/FullScreenLoader";

export default function LoyaltyScreen({ navigation }): JSX.Element {
    const setClient = useSetClient();
    const { isLoading } = useQuery('profile', profile, { onSuccess: (data) => setClient(data) });

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
        padding: 10,
        gap: 10
    },
});
