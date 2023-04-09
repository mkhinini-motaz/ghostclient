import React, {useCallback} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import I18nSelect from "../components/Common/I18nSelect";
import TranslatableText from "../components/Common/TranslatableText";
import {COLOR_PRIMARY} from "../constants";
import RNBounceable from "@freakycoder/react-native-bounceable";
import {useClient, useSetClient} from "../store/hooks";
import {setClientToken} from "../support/auth";
import LoyaltyPoints from "../components/Loyalty/LoyaltyPoints";

export default function LoyaltyScreen({ navigation }): JSX.Element {

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <LoyaltyPoints />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10
    },
});
