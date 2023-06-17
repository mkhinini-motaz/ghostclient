import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import TranslatableText from "./TranslatableText";
import LangAwareView from "./LangAwareView";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface NoInternetConnexionIndicatorProps {

}

function NoInternetConnexionIndicator({}: NoInternetConnexionIndicatorProps): JSX.Element {
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsHidden(state.isConnected);
        });
        return () => unsubscribe && unsubscribe();
    }, []);

    if (isHidden) {
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
