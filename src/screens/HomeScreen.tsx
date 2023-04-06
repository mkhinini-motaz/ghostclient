import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import ServiceList from "../components/Service/ServiceList";
import {useQuery} from "react-query";
import index from "../api/service";
import FullScreenLoader from "../components/Common/FullScreenLoader";

export default function HomeScreen(): JSX.Element {
    const { isLoading, error, data } = useQuery('service.index', index, { refetchOnMount: false, refetchOnWindowFocus: false });

    if (isLoading) {
        return <FullScreenLoader />;
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
