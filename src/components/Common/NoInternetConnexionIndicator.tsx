import React, {memo} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {useNetInfo} from "@react-native-community/netinfo";
import TranslatableText from "./TranslatableText";
import LangAwareView from "./LangAwareView";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface NoInternetConnexionIndicatorProps {

}

function NoInternetConnexionIndicator({}: NoInternetConnexionIndicatorProps): JSX.Element {
    const netInfo = useNetInfo();
    if (! netInfo.isConnected) {
        return <></>;
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Icon size={38} name={'wifi-off'} />
                <TranslatableText data={"common:no_internet"} style={styles.text} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee33',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
    }
});

export default memo(NoInternetConnexionIndicator);
