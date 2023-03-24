import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface EmptyCartProps {

}

export default function EmptyCart({}: EmptyCartProps): JSX.Element {
    return (
        <View>
            <Text>Cart empty</Text>
        </View>
    );
};

const styles = StyleSheet.create({});
