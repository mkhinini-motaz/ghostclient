import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LoyaltyActionClass from '../../classes/LoyaltyAction';
import LangAwareView from "../Common/LangAwareView";
import TranslatableText from "../Common/TranslatableText";
import {formatDateTime} from "../../support/utils";

interface LoyaltyActionProps {
    data: LoyaltyActionClass,
}

function LoyaltyAction({ data }: LoyaltyActionProps): JSX.Element {
    return (
        <LangAwareView style={styles.container}>
            <View style={{ ...styles.pointsContainer, backgroundColor: data.points_rewarded > 0 ? '#28a745' : '#dc3545' }}>
                <Text style={styles.pointsText} >{(data.points_rewarded > 0 ? '+' : '') + data.points_rewarded}</Text>
            </View>

            <View style={styles.textContainer}>
                <TranslatableText data={'loyalty_action:type:' + data.type} style={styles.text} />
                <Text style={styles.text} >{formatDateTime(data.created_at)}</Text>
            </View>
        </LangAwareView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 15,
        alignItems: 'center',
    },
    pointsContainer: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'center',
    },
    pointsText: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white',
    },
    textContainer: {

    },
    text: {
        fontSize: 20,
    },
});

export default memo(LoyaltyAction);
