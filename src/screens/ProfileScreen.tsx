import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {useLang, useSetClient} from "../store/hooks";
import {profile} from "../api/auth";
import FullScreenLoader from "../components/Common/FullScreenLoader";
import {useQuery} from "react-query";
import UpdateProfile from "../components/Auth/UpdateProfile";
import {alertNetworkError} from "../support/alert";

export default function ProfileScreen({ navigation }): JSX.Element {
    const setClient = useSetClient();
    const { selectedLang } = useLang();

    const { isLoading: fetchIsLoading } = useQuery('profile', profile, {
        onSuccess: (data) => setClient(data),
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }
        }
    });

    if (fetchIsLoading) {
        return <FullScreenLoader />
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <UpdateProfile />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {

    },
});
