import React, {useEffect, useMemo, useState} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import OptionGroup from "../../classes/OptionGroup";
import Product, {productPrice} from "../../classes/Product";
import OptionClass, {DEFAULT_QUANTITY} from "../../classes/Option";
import TranslatableText from "../Common/TranslatableText";
import {COLOR_PRIMARY} from "../../constants";
import {translate} from "../../i18n";
import Option from "./Option";
import MoneyFormatter from "../Common/MoneyFormatter";
import LangAwareView from "../Common/LangAwareView";
import RNBounceable from "@freakycoder/react-native-bounceable";

interface ProductWithOptionsProps {
    data: Product,
}

export default function ProductWithOptions({ data }: ProductWithOptionsProps): JSX.Element {
    const [ options, setOptions ] = useState<OptionClass[]>([]);
    const [ count, setCount ] = useState<number>(1);
    let bounceableMoneyRef: RNBounceable | null = null;

    const onQuantityChange = (selectedOption: OptionClass, quantity: number) => {
        let newOptions = [...options];
        newOptions.forEach(option => {
            if (option.id === selectedOption.id) {
                option.quantity = quantity;
            }
        });
        setOptions(newOptions);
    };

    const createOnChangeHandler = (optionGroup: OptionGroup, option: OptionClass) => (isSelected: boolean) => {
        if (! isSelected) {
            const newOptions = options.filter((element: OptionClass) => element.id !== option.id);
            setOptions(newOptions);
// TODO:replace            props.onChange(newOptions);
            return;
        }

        const existingOptionsForGroup = options.filter((element: OptionClass) => element.option_group_id === option.option_group_id);
        const newOptions = [...options];
        if (existingOptionsForGroup.length >= optionGroup.max_options) {
// TODO: replace snackbar            dispatch(showSnackbar(SnackBarErrorMaxOptions(optionGroup)));
            return;
        }

        if (optionGroup.options_are_quantifiable) {
            option.quantity = DEFAULT_QUANTITY;
        }

// TODO: sort options by order
        newOptions.push(option);
        if (productPrice(data, count, options) !== productPrice(data, count, newOptions)) {
            bounceableMoneyRef.bounceAnimation(1, 1, 1);
        }
        setOptions(newOptions);
// TODO:replace            props.onChange(newOptions);
    };

    useEffect(() => {
        const defaultOptions = [];
        for (let optionGroup of data.option_groups) {
            for (let option of optionGroup.options) {
                if (option.is_selected_by_default) {
                    defaultOptions.push(option)
                }
            }
        }
        setOptions(defaultOptions);
    }, []);

    return (
        <View>
            <ScrollView style={styles.scrollView}>
                {data.option_groups.map(optionGroup => (
                    <View key={'option_group_' + optionGroup.id}>
                        <TranslatableText data={optionGroup.name} style={styles.text} />
                        <View style={styles.optionGroupContainer} >
                            {optionGroup.options.map(option => (
                                <Option data={option} key={'option_' + option.id}
                                        onPress={createOnChangeHandler(optionGroup, option)}
                                        isSelected={!! options.filter(element => element.id === option.id).length}
                                        onQuantityChange={(quantity) => onQuantityChange(option, quantity)}
                                        isQuantifiable={!! optionGroup.options_are_quantifiable}
                                />
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            <LangAwareView style={styles.bottomContainer}>
                <View style={styles.priceAndQuantityContainer}>
                    <RNBounceable ref={(ref: any) => (bounceableMoneyRef = ref)} >
                        <MoneyFormatter data={productPrice(data, count, options)} style={styles.money}/>
                    </RNBounceable>
                </View>
                <View style={styles.confirmButtonContainer}>
                    <Button title={translate('common:confirm', 'fr')}
                            onPress={() => console.log(options)}
                    />
                </View>
            </LangAwareView>
        </View>
    );
};

const styles = StyleSheet.create({
    optionGroupContainer: {
        padding: 10,
    },
    scrollView: {
        height: '90%'
    },
    text: {
        color: 'white',
        backgroundColor: COLOR_PRIMARY + 'cf',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 10,
        padding: 10,
    },
    bottomContainer: {
        padding: 10,
        marginBottom: 10,
    },
    priceAndQuantityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    money: {
        color: COLOR_PRIMARY,
        fontSize: 19,
        fontWeight: '700'
    },
});
