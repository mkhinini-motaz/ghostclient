import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import TranslatableText from "../Common/TranslatableText";
import {useDispatch, useSelector} from "../../store/hooks";
import {setCartPromoCode} from "../../store/actions/cart";
import {useQuery} from "react-query";
import {product} from "../../api/shop";
import {show} from "../../api/promoCode";
import {API_URL, COLOR_PRIMARY} from "../../constants";
import Image from "../Common/Image";
import LangAwareView from "../Common/LangAwareView";

interface PromoCodeProps {

}

export default function PromoCode({}: PromoCodeProps): JSX.Element {
    const dispatch = useDispatch();
    const { promoCode } = useSelector(state => state.Cart);
    const [code, setCode] = useState(promoCode?.code);
    const [input, setInput] = useState(code);

    const promoCodeCallback = useCallback(show(code), [code]);
    const { isLoading, error, data } = useQuery(['promoCode.show', code], promoCodeCallback, { enabled: !! code, onSuccess: (data) => dispatch(setCartPromoCode(data)) });

console.log({input, data, code})

    const timeoutId = useRef(0);
    const onChange = useCallback((text: string) => {
        setInput(text);
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => setCode(text), 1700)
    }, []);

    const imageStyle = { ...styles.image, opacity: promoCode?.id ? 1 : 0.3 };

    useEffect(() => () => clearTimeout(timeoutId.current), []);

    return (
        <LangAwareView style={styles.container}>
            <View style={{ width: isLoading ? '55%' : '65%' }}>
                <TranslatableText data={"cart:promo_code:label"} style={styles.label} />
                <TextInput
                    autoCorrect={false}
                    numberOfLines={4}
                    maxLength={10}
                    onChangeText={onChange}
                    value={input}
                    style={styles.textInput}
                />
            </View>
            {! isLoading ? '' :
                <View style={{ width: '10%' }}>
                        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
                </View>
            }
            <View style={{ width: '35%' }}>
                <Image source={require('../../images/coins.png')}
                       style={imageStyle}
                       imageStyle={imageStyle}
                />
            </View>
        </LangAwareView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
    },
    textInput: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
        borderColor: COLOR_PRIMARY + '88',
        borderBottomWidth: 1.5,
        borderRadius: 50,
        fontSize: 18,
    },
    textInputContainer: {
        width: '55%',
    },
    activityIndicatorContainer: {
        width: '10%',
    },
    iconContainer: {
        width: '35%',
    },
    image: {
        height: 70,
        borderRadius: 20,
    },
});
