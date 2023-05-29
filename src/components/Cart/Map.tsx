import React, {useState} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import ButtonField from "../Form/ButtonField";
import { useNavigation } from '@react-navigation/native';
import {useSelector} from "../../store/hooks";

interface MapProps {

}

export default function Map({}: MapProps): JSX.Element {
    const navigation = useNavigation();
    const { address } = useSelector(state => state.Cart);

    return (
        <View style={styles.container}>
            <ButtonField label={!!address.lat ? 'common:location:change' : 'common:location:choose'} onPress={() => navigation.navigate('MapScreen')} buttonType={!!address.lat ? 'outlined' : 'contained'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        position: 'relative',
    },

});
