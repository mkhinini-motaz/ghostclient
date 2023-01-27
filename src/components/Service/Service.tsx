import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Service(): JSX.Element {
    return (
        <View style={styles.container} >
            <Text>A service</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: 250,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
    }
});
