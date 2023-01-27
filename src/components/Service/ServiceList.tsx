import React from 'react';
import {StyleSheet, View} from 'react-native';
import Service from "./Service";

export default function ServiceList(): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Service />
                <Service />
            </View>
            <View style={{...styles.subContainer, marginTop: 30}}>
                <Service />
                <Service />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: '100%',
        paddingHorizontal: 5,
    },
    subContainer: {
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
});
