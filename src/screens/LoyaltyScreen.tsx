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

export default function LoyaltyScreen({ navigation }): JSX.Element {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <LoyaltyPoints />
                    <PromoCodeShop />
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
