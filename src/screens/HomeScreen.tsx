import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import ServiceList from "../components/Service/ServiceList";
import {useQuery} from "react-query";
import index from "../api/service";
import FullScreenLoader from "../components/Common/FullScreenLoader";
import {alertNetworkError} from "../support/utils";
import {useLang} from "../store/hooks";

export default function HomeScreen(): JSX.Element {
    const { selectedLang } = useLang();
    const { isLoading, error, data } = useQuery('service.index', index, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }
        },
    });

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
