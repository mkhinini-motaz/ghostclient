import React, {memo} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import PromoCodeClass from '../../classes/PromoCode';
import MoneyFormatter from "../Common/MoneyFormatter";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import LangAwareView from "../Common/LangAwareView";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import Icon from "react-native-vector-icons/MaterialIcons";
import TranslatableText from "../Common/TranslatableText";
import Clipboard from '@react-native-clipboard/clipboard';
import {translate} from "../../i18n";
import {useLang} from "../../store/hooks";
import {formatDateTime} from "../../support/utils";

interface PromoCodeProps {
    data: PromoCodeClass,
}

function PromoCode({ data }: PromoCodeProps): JSX.Element {
    const { selectedLang } = useLang();
    const onPressCopyIcon = () => {
        if (! data.is_usable) {
            Alert.alert('', translate('promo_code:code:used:error', selectedLang),
                [{ text: translate('common:ok', selectedLang), }], { cancelable: true });
            return;
        }

        Clipboard.setString(data.code);
        Alert.alert('', translate('profile:invite_code:copied:title', selectedLang),
            [{ text: translate('common:ok', selectedLang), }], { cancelable: true });
    };

    return (
        <View style={styles.container}>
            <LangAwareView style={styles.codeAndReductionContainer}>
                <View>
                    <View style={{ ...styles.reductionAmountContainer, ...(data.is_usable ? {} : { backgroundColor: '#e0e0e0' }) }}>
                        <MoneyFormatter data={data.reduction_amount} style={{ ...styles.reductionAmountText, ...(data.is_usable ? {} : { color: 'black' }) }} />
                    </View>
                </View>
                <View style={styles.codeContainer}>
                    <Text style={styles.codeText}>{data.code}</Text>
                    <RNBounceable onPress={onPressCopyIcon} >
                        <LangAwareView style={{ ...styles.copyIconContainer, ...(data.is_usable ? {} : { backgroundColor: '#e0e0e0' }) }}>
                            <Icon size={20} name={'content-copy'} color={data.is_usable ? 'white' : 'black'} />
                            <TranslatableText data={'common:copy'} style={{ ...styles.copyText, ...(data.is_usable ? {} : { color: 'black' }) }} />
                        </LangAwareView>
                    </RNBounceable>
                </View>

            </LangAwareView>
            <View style={styles.datesContainer}>
                <LangAwareView>
                    <TranslatableText data={'common:created_at'} style={styles.description} />
                    <Text style={styles.description}> : </Text>
                    <Text style={styles.description}>{formatDateTime(data.created_at)}</Text>
                </LangAwareView>
                <LangAwareView>
                    <TranslatableText data={'promo_code:expires_at'} style={styles.description} />
                    <Text style={styles.description}> : </Text>
                    <Text style={styles.description}>{formatDateTime(data.expires_at)}</Text>
                </LangAwareView>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        gap: 10,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        alignSelf: 'center',
    },
    codeAndReductionContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    datesContainer: {
        alignItems: 'center',
    },
    reductionAmountContainer: {
        borderRadius: 20,
        backgroundColor: COLOR_SECONDARY,
        padding: 10,
        justifyContent: 'center',
        flexGrow: 0,
    },
    reductionAmountText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    codeContainer: {
        alignItems: 'center',
        gap: 10
    },
    codeText: {
        fontSize: 20,
        fontWeight: '600',
        color: COLOR_SECONDARY,
    },
    copyIconContainer: {
        backgroundColor: COLOR_PRIMARY,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        gap: 5,
    },
    copyText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    description: {
        fontSize: 20,
    }
});

export default memo(PromoCode);
