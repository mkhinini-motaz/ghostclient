import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LangAwareView from "../Common/LangAwareView";
import ChoiceClass from "../../classes/Choice";
import TranslatableText from "../Common/TranslatableText";
import MoneyFormatter from "../Common/MoneyFormatter";
import {productPrice, TYPE_WEIGHTABLE} from "../../classes/Product";
import Option from "./Option";
import {translate} from "../../i18n";
import {useLang} from "../../store/hooks";

interface ChoiceProps {
    data: ChoiceClass
}

function Choice({ data }: ChoiceProps): JSX.Element {
    const { selectedLang } = useLang();
    const totalPrice = productPrice(data.product, data.product_count, data.options);
    const quantity = data.product.type !== TYPE_WEIGHTABLE ? data.product_count :
        (data.product_count > 999 ?
                [
                    (data.product_count / 1000).toString().replace('.', ','),
                    translate('common:kg', selectedLang)
                ] :
                [
                    data.product_count,
                    translate('common:g', selectedLang)
                ]
        ).join(' ');

    return (
        <View style={styles.container}>
            <LangAwareView style={styles.subContainer}>
                <LangAwareView style={styles.nameContainer} >
                    <Text style={styles.text}>{quantity}</Text>
                    <Text style={styles.text}> X </Text>
                    <View>
                        <TranslatableText data={data.product.category.name} style={styles.text} />
                        <TranslatableText data={data.product.name} style={styles.text} />
                    </View>
                </LangAwareView>

                <MoneyFormatter data={totalPrice} style={styles.text} />
            </LangAwareView>

            {! data.options || data.options.length === 0 ? '' :
                <LangAwareView style={styles.optionsContainer}>
                    {data.options.map(
                        option => <Option data={option} key={'order_product_option_' + option.id} />
                    )}
                </LangAwareView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameContainer: {
        alignItems: 'center',
        gap: 5,
    },
    text: {
        fontSize: 18,
    },
    optionsContainer: {
        flexWrap: 'wrap',
        gap: 10,
    }
});

export default memo(Choice);
