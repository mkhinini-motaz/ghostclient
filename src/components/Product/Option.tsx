import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OptionClass from "../../classes/Option";
import TranslatableText from "../Common/TranslatableText";
import MoneyFormatter from "../Common/MoneyFormatter";
import {API_URL} from "../../constants";

interface OptionProps {
    data: OptionClass,
}

export default function Option({ data }: OptionProps): JSX.Element {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <TranslatableText data={data.name} style={styles.nameText} />
                    {! data.price ? <></> : <MoneyFormatter data={data.price} style={styles.money} />}
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: API_URL + data.photo }} style={styles.image} />
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        borderRadius: 20,
        margin: 5,
        flexDirection: 'row',
    },
    nameText: {
        fontSize: 18,
    },
    textContainer: {
        flexWrap: 'wrap',
        padding: 10,
        flexBasis: 1,
        flexGrow: 1,
        gap: 5,
    },
    imageContainer: {
        flexBasis: 1,
        flexGrow: 1,
    },
    image: {
        height: 120,
        width: '100%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    money: {
        fontSize: 15,
        fontWeight: '500',
    },
});
