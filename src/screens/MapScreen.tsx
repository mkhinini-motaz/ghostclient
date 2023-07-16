import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, Alert,} from 'react-native';
import Image from "../components/Common/Image";
import { useNavigation } from '@react-navigation/native';

import MapView, { Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../constants";
import {useClient, useDispatch, useLang, useSelector} from "../store/hooks";
import ButtonField from "../components/Form/ButtonField";
import {setCartAddress} from "../store/actions/cart";
import {pointInPolygon} from "../support/utils";
import {translate} from "../i18n";
import LangAwareView from "../components/Common/LangAwareView";

interface MapScreenProps {
    route: any,
}

export default function MapScreen({ route }: MapScreenProps): JSX.Element {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { selectedLang } = useLang();
    const client = useClient();
    const { address } = useSelector(state => state.Cart);
    const polygon = client.shops[0].service_area.map(cordinate => ({ latitude: cordinate[0], longitude: cordinate[1] })); // TODO: service area should be moved elsewhere

    const onConfirm = () => {
        if (! pointInPolygon(client.shops[0].service_area, [region.latitude, region.longitude])) {
            Alert.alert(
                '',
                translate('cart:location:not_served', selectedLang),
                [{ text: translate('common:ok', selectedLang), }],
            );
            return;
        }

        dispatch(setCartAddress({ lat: region.latitude, lng: region.longitude }));
        navigation.navigate('CartScreen');
    };

    const [region, setRegion] = useState({
        latitude: address.lat || 35.734103,
        longitude: address.lng || 10.583407,
        latitudeDelta: 0.03922,
        longitudeDelta: 0.03421,
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
                        <Polygon coordinates={polygon} fillColor={COLOR_PRIMARY + '22'} strokeColor={COLOR_PRIMARY} />

                    </MapView>
                    <View style={styles.markerFixed}>
                        <Image source={require('../images/marker.png')}
                               style={styles.marker}
                               imageStyle={styles.marker}
                        />
                    </View>
                </View>
                <LangAwareView style={styles.confirmButtonContainer}>
                    <ButtonField label={'common:cancel'} onPress={() => navigation.navigate('CartScreen')} buttonType={'outlined'} />
                    <ButtonField label={'common:confirm'} onPress={onConfirm} />
                </LangAwareView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
    mapContainer: {
        height: '87%',
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
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 48,
        width: 48
    },
});
