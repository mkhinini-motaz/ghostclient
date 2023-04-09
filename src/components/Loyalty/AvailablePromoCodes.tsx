import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import TranslatableText from "../Common/TranslatableText";
import {COLOR_PRIMARY} from "../../constants";
import {useClient} from "../../store/hooks";
import PromoCode from "./PromoCode";

interface AvailablePromoCodesProps {

}

function AvailablePromoCodes({}: AvailablePromoCodesProps): JSX.Element {
    const client = useClient();
    const promoCodes = client.promoCodes;
    const promoCodesOutput = [];
    for (let promoCode of promoCodes) {
        promoCodesOutput.push(<PromoCode data={promoCode} key={'loyalty_promo_code_' + promoCode.id} />);
    }

    return (
        <View style={styles.container}>
            <TranslatableText data={'loyalty:your_promo_codes'} style={styles.title} />
            {promoCodesOutput.length === 0 ?
                <TranslatableText data={'loyalty:your_promo_codes:empty'} style={styles.description} /> :
                promoCodesOutput
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
    description: {
        fontSize: 20,
    },
});

export default memo(AvailablePromoCodes);
