import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import ServiceList from "../components/Service/ServiceList";
import {useQuery} from "react-query";
import index from "../api/service";
import {useSelector} from "../store/hooks";

export default function HomeScreen(): JSX.Element {
    const { isLoading, error, data } = useQuery('index.ts', index);
    const state = useSelector(state => state);

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
            <View style={styles.container}>
                <ServiceList data={data} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});
