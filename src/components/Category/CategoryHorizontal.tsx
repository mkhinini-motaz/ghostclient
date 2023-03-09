import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TranslatableText from "../Common/TranslatableText";
import Category from "../../classes/Category";
import {COLOR_PRIMARY} from "../../constants";
import RNBounceable from "@freakycoder/react-native-bounceable";

interface CategoryHorizontalProps {
    onPress: () => void,
    data: Category,
}

export default function CategoryHorizontal({ onPress, data }: CategoryHorizontalProps): JSX.Element {
    return (
        <View style={styles.container}>
            <RNBounceable onPress={onPress}>
                <View style={styles.subContainer}>
                    <TranslatableText data={data.name} style={styles.text} adjustsFontSizeToFit />
                </View>
            </RNBounceable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    subContainer: {
        borderColor: COLOR_PRIMARY,
        backgroundColor: 'white',
        borderWidth: 0.18,
        borderRadius: 20,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 4,
    },
    text: {
        textAlign: 'center',
        color: COLOR_PRIMARY,
        fontSize: 25,
    },
});
