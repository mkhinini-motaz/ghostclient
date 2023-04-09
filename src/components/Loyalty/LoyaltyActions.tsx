import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import TranslatableText from "../Common/TranslatableText";
import {COLOR_PRIMARY} from "../../constants";
import {useQuery} from "react-query";
import {index} from "../../api/loyaltyAction";
import LoyaltyAction from "./LoyaltyAction";

interface LoyaltyActionsProps {

}

function LoyaltyActions({}: LoyaltyActionsProps): JSX.Element {
    const { isLoading, error, data } = useQuery('loyalty_action.index', index); // TODO: pagination

    const loyaltyActionsComponents = [];
    if (! isLoading && ! error) {
        for (let loyaltyAction of data) {
            loyaltyActionsComponents.push(<LoyaltyAction data={loyaltyAction} key={'loyalty_action_' + loyaltyAction.id} />)
        }
    }

    return (
        <View style={styles.container}>
            <TranslatableText data={'loyalty:history'} style={styles.title} />
            {isLoading ?
                <ActivityIndicator size={'large'} color={COLOR_PRIMARY} /> :
                loyaltyActionsComponents
            }
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
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: COLOR_PRIMARY,
    },
});

export default memo(LoyaltyActions);
