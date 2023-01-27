import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import ServiceList from "../components/Service/ServiceList";

export default function HomeScreen(): JSX.Element {
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Text>home screen</Text>
                <ServiceList />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});
