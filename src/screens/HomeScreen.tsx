import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import ServiceList from "../components/Service/ServiceList";
import {useQuery} from "react-query";
import index from "../api/service";

export default function HomeScreen(): JSX.Element {
    const { isLoading, error, data } = useQuery('service.index.ts', index);
    if (isLoading) {
        return (
            <Text>Loading ...</Text>
        );
    }

    if (error) {
        return (
            <Text>{JSON.stringify(error)}</Text>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <ServiceList data={data} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});
