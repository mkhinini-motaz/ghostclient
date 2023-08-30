import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView,} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {Marker} from "react-native-maps/lib";
import {COLOR_SECONDARY} from "../constants";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";

interface LocationShowMapScreenProps {
    route: any,
}

export default function LocationShowMapScreen({ route }: LocationShowMapScreenProps): JSX.Element {
    const navigation = useNavigation();
    const location = route.params.location;
    const [region, setRegion] = useState({
        latitude: location.latitude || 35.734103,
        longitude: location.longitude || 10.583407,
        latitudeDelta: 0.01022,
        longitudeDelta: 0.01021,
    });

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={region}
                        onRegionChangeComplete={setRegion}
                        userLocationUpdateInterval={2000}
                        zoomTapEnabled
                        showsUserLocation
                        followsUserLocation
                    >
                        <Marker coordinate={location} />
                    </MapView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIconContainer: {
        paddingRight: 5,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    mapContainer: {
        height: '100%',
        width: '100%',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 4,
    },
    confirmButtonContainer: {
        height: '13%',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    map: {
        flex: 1,
    },
});
