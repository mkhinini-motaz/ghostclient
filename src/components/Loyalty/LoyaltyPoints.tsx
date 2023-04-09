import React, {memo} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {useClient, useLang} from "../../store/hooks";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import TranslatableText from "../Common/TranslatableText";
import LangAwareView from "../Common/LangAwareView";
import Icon from "react-native-vector-icons/MaterialIcons";
import RNBounceable from "@freakycoder/react-native-bounceable/build/dist/RNBounceable";
import Clipboard from '@react-native-clipboard/clipboard';
import {translate} from "../../i18n";

interface LoyaltyPointsProps {

}

function LoyaltyPoints({}: LoyaltyPointsProps): JSX.Element {
    const { selectedLang } = useLang();
    const client = useClient();

    const onPressCopyIcon = () => {
        Clipboard.setString(client.invite_code);
        Alert.alert('', translate('profile:invite_code:copied:title', selectedLang),
            [{ text: translate('common:ok', selectedLang), }], { cancelable: true })
    };

    return (
        <View style={styles.container}>
            <LangAwareView style={styles.subContainer}>
                <LangAwareView style={styles.pointsContainer}>
                    <Text style={styles.pointsText}>{client.loyalty_points_count}</Text>
                </LangAwareView>
                <TranslatableText data={'profile:loyalty_points'} style={styles.title} />
            </LangAwareView>

            <TranslatableText data={'profile:invite_code:description'} style={styles.description} />

            <LangAwareView style={styles.inviteCodeContainer}>
                <TranslatableText data={'form:invite_code:label'} style={styles.inviteCodeLabelText} />
                <Text style={styles.inviteCodeLabelText}>:</Text>
                <Text style={styles.inviteCodeText}>{client.invite_code}</Text>
                <RNBounceable onPress={onPressCopyIcon} >
                    <LangAwareView style={styles.copyIconContainer}>
                        <Icon size={20} name={'content-copy'} color={'white'} />
                        <TranslatableText data={'common:copy'} style={styles.copyText} />
                    </LangAwareView>
                </RNBounceable>
            </LangAwareView>
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
    },
    subContainer: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 20,
        gap: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_SECONDARY,
    },
    pointsContainer: {
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    pointsText: {
        color: 'white',
        fontSize: 30,
        fontWeight: '500',
    },
    description: {
        fontSize: 20,
    },
    inviteCodeContainer: {
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 5,
    },
    inviteCodeLabelText: {
        fontSize: 20,
    },
    inviteCodeText: {
        fontSize: 20,
        color: COLOR_SECONDARY,
        fontWeight: '700',
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
});

export default memo(LoyaltyPoints);
