import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LangAwareView from "../Common/LangAwareView";
import ChoiceClass from "../../classes/Choice";
import TranslatableText from "../Common/TranslatableText";
import MoneyFormatter from "../Common/MoneyFormatter";
import {productPrice, TYPE_WEIGHTABLE} from "../../classes/Product";
import {translate} from "../../i18n";
import {useLang} from "../../store/hooks";
import Image from "../Common/Image";
import {API_URL} from "../../constants";
import {optionOutput} from "../../classes/Option";

interface ChoiceProps {
    data: ChoiceClass
}

function Choice({ data }: ChoiceProps): JSX.Element {
    const { selectedLang, selectedLangWriteFrom } = useLang();
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
        <LangAwareView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: API_URL + data.product.photo }}
                    style={styles.image}
                    imageStyle={styles.image}
                />
            </View>

            <View style={styles.subContainer}>
                <LangAwareView style={styles.nameContainer} >
                    <TranslatableText data={data.product.category.name} style={styles.text} />
                    <Text style={styles.text}> - </Text>
                    <TranslatableText data={data.product.name} style={styles.text} />
                </LangAwareView>

                <LangAwareView>
                    <Text style={styles.text}>{quantity}</Text>
                    <Text style={styles.text}> - </Text>
                    <MoneyFormatter data={totalPrice} style={styles.text} />
                </LangAwareView>
                <LangAwareView>
                    <MoneyFormatter data={data.product.price} style={styles.money} />
                    {data.product.type !== TYPE_WEIGHTABLE ? '' : <>
                        <Text style={styles.money}> / </Text>
                        <TranslatableText data={'common:kg'} style={styles.money} />
                    </>}
                </LangAwareView>

                {! data.options || data.options.length === 0 ? '' :
                    <LangAwareView style={{ ...styles.optionsContainer, alignSelf: 'flex-' + selectedLangWriteFrom === 'right' ? 'end' : 'end'}}>
                        <Text style={{ ...styles.text, textAlign: selectedLangWriteFrom }}>
                            {data.options.map(option => optionOutput(option, selectedLang, selectedLangWriteFrom)
                            ).join(', ')}
                        </Text>
                    </LangAwareView>
                }
            </View>
        </LangAwareView>
    );
}

const styles = StyleSheet.create({
    image: {
        minHeight: 80,
        flex: 1,
        borderRadius: 20,
    },
    imageContainer: {
        padding: 5,
        width: '30%',
    },
    subContainer: {
    },
    nameContainer: {
        alignItems: 'center',
        gap: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
    },
    money: {
        fontSize: 16,
        fontWeight: '500',
    },
    optionsContainer: {
        width: '87%',
        flexWrap: 'wrap',
    },
    optionsText: {
        fontSize: 18,
        fontWeight: '500',
    }
});

export default memo(Choice);
