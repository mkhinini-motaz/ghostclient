import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {useSetClient} from "../store/hooks";
import {profile} from "../api/auth";
import FullScreenLoader from "../components/Common/FullScreenLoader";
import {useQuery} from "react-query";
import UpdateProfile from "../components/Auth/UpdateProfile";
import UpdatePassword from "../components/Auth/UpdatePassword";

export default function ProfileScreen({ navigation }): JSX.Element {
    const setClient = useSetClient();
    const { isLoading: fetchIsLoading } = useQuery('profile', profile, { onSuccess: (data) => setClient(data) });

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
