import React, {memo} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import TranslatableText from "../Common/TranslatableText";
import Image from "../Common/Image";
import {API_URL, COLOR_PRIMARY} from "../../constants";
import Category from "../../classes/Category";
import { useNavigation } from '@react-navigation/native';
import {useLang} from "../../store/hooks";

interface CategoryCardProps {
    data: Category,
    countInCart: number,
    style?: ViewStyle,
}

function CategoryCard({ data, countInCart = 0, style = {} }: CategoryCardProps): JSX.Element {
    const { selectedLangWriteFrom } = useLang();
    const navigation = useNavigation();
    const navigate = () => {
        navigation.navigate('ProductList', { categoryId: data.id, categoryName: data.name });
    };

    return (
        <RNBounceable style={style} onPress={navigate}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <View style={styles.textBackground}>
                        <TranslatableText style={styles.text} data={data.name} />
                    </View>
                </View>

                <Image source={{ uri: API_URL + data.photo }} style={styles.image} imageStyle={styles.image} />

                {countInCart === 0 ? '' :
                    <View style={{ ...styles.badge, [selectedLangWriteFrom]: -10 }}>
                        <Text style={styles.badgeText}>{countInCart}</Text>
                    </View>
                }
            </View>
        </RNBounceable>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        height: 170,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        borderRadius: 20,
    },
    image: {
        flexGrow: 1,
        width: '100%',
        resizeMode: 'stretch',
        borderRadius: 20,
    },
    textContainer: {
        position: 'absolute',
        zIndex: 2,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
    },
    textBackground: {
        backgroundColor: '#33333366',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fefefe',
        textAlign: 'center',
    },
    badge: {
        position: 'absolute',
        backgroundColor: COLOR_PRIMARY,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        top: -10,
    },
    badgeText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
});

export default memo(CategoryCard);
