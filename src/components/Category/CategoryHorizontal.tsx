import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TranslatableText from "../Common/TranslatableText";
import Category from "../../classes/Category";
import {COLOR_PRIMARY} from "../../constants";

interface CategoryHorizontalProps {
    onPress: () => void,
    data: Category,
}

export default function CategoryHorizontal({ onPress, data }: CategoryHorizontalProps): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <TranslatableText data={data.name} style={styles.text} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    text: {
        color: COLOR_PRIMARY,
        fontSize: 25,
    },
});
