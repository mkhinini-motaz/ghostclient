import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Image from "../Common/Image";
import TranslatableText from "../Common/TranslatableText";

interface EmptyOrdersProps {

}

export default function EmptyOrders({}: EmptyOrdersProps): JSX.Element {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image source={require('../../images/surfing.png')}
                       style={styles.image}
                       imageStyle={styles.image}
                />
                <TranslatableText data={'order:empty:description'} style={styles.text} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        height: '100%',
    },
    image: {
        height: 250,
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
});
