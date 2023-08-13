import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

interface DividerProps {

}

function Divider({}: DividerProps): JSX.Element {
    return (
        <View style={{
                borderBottomColor: '#aaa',
                borderBottomWidth: 1.5,
                marginHorizontal: 5,
            }}
        />
    );
}

const styles = StyleSheet.create({});

export default memo(Divider);
