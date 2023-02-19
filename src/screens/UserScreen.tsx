import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import I18nSelect from "../components/Common/I18nSelect";

export default function UserScreen(): JSX.Element {
    return (
        <View>
            <Text>User screen</Text>
            <I18nSelect />
        </View>
    );
};

const styles = StyleSheet.create({});
