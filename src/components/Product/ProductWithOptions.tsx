import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Button, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import OptionGroup from "../../classes/OptionGroup";
import Product, {productPrice, TYPE_WEIGHTABLE, TYPE_WITH_OPTIONS} from "../../classes/Product";
import OptionClass, {DEFAULT_QUANTITY, indexOptionsByGroup} from "../../classes/Option";
import TranslatableText from "../Common/TranslatableText";
import {COLOR_PRIMARY} from "../../constants";
import {translate} from "../../i18n";
import Option from "./Option";
import MoneyFormatter from "../Common/MoneyFormatter";
import LangAwareView from "../Common/LangAwareView";
import RNBounceable from "@freakycoder/react-native-bounceable";
import QuantityButton from "../Common/QuantityButton";
import {useDispatch, useLang, useSelector} from "../../store/hooks";
import {
    createChoiceTypeFixed,
    createChoiceTypeWithOptions,
    deleteChoiceTypeWithOptions
} from "../../store/actions/cart";

interface ProductWithOptionsProps {
    data: Product,
    onConfirm?: () => void,
}

export default function ProductWithOptions({ data, onConfirm }: ProductWithOptionsProps): JSX.Element {
    const dispatch = useDispatch();
    const [ options, setOptions ] = useState<OptionClass[]>([]);
    const [ count, setCount ] = useState<number>(1);
    const { selectedLang } = useLang();
    let bounceableMoneyRef: RNBounceable | null = null;
    const { shopId } = useSelector((state) => state.Cart);

    const onQuantityChange = (selectedOption: OptionClass, quantity: number) => {
        let newOptions = [];
        options.forEach(option => {
            const newOption = { ...option };
            console.log('condition : ', newOption.id === selectedOption.id)
            if (newOption.id === selectedOption.id) {
                newOption.quantity = quantity;
            }
            newOptions.push(newOption);
        });

        setOptions(newOptions);
    };

    const createOnChangeHandler = (optionGroup: OptionGroup, option: OptionClass) => (isSelected: boolean) => {
        if (! isSelected) {
            const newOptions = options.filter((element: OptionClass) => element.id !== option.id);
            setOptions(newOptions);
            return;
        }

        const existingOptionsForGroup = options.filter((element: OptionClass) => element.option_group_id === option.option_group_id);
        const newOptions = [...options];
        if (existingOptionsForGroup.length >= optionGroup.max_options) {
            Alert.alert(
                '',
                translate('option:max:count', selectedLang, {
                    optionCount: optionGroup.max_options,
                    optionGroupName: optionGroup.name,
                }),
                [{ text: translate('common:ok', selectedLang), }],
            );
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
    };

    useEffect(() => {
        const defaultOptions = [];
        for (let optionGroup of data.option_groups) {
            for (let option of optionGroup.options) {
                if (option.is_selected_by_default) {
                    defaultOptions.push({ ...option })
                }
            }
        }
        setOptions(defaultOptions);
    }, []);

    const onConfirmPress = () => {
        const indexedOptions = indexOptionsByGroup(options);
        for (let optionGroup of data.option_groups) {
            let optionsForCategory = indexedOptions[optionGroup.id] || [];
            if (optionsForCategory.length < optionGroup.min_options) {
                Alert.alert(
                    '',
                    translate('option:min:count', selectedLang, {
                        optionCount: optionGroup.min_options,
                        optionGroupName: optionGroup.name,
                    }),
                    [{
                        text: translate('common:ok', selectedLang),
                    }],
                );
                return;
            }

            if (optionsForCategory.length > optionGroup.max_options) {
                Alert.alert(
                    '',
                    translate('option:max:count', selectedLang, {
                        optionCount: optionGroup.max_options,
                        optionGroupName: optionGroup.name,
                    }),
                    [{
                        text: translate('common:ok', selectedLang),
                    }],
                );
                return;
            }
        }

        dispatch(createChoiceTypeWithOptions({ product_id: data.id, product_count: count, options, shop_id: shopId }));
        if (onConfirm) {
            onConfirm();
        }
    };

    return (
        <View style={{ position: 'relative' }}>
            <ScrollView style={styles.scrollView}>
                {data.option_groups.map(optionGroup => (
                    <View key={'option_group_' + optionGroup.id}>
                        <TranslatableText data={optionGroup.name} style={styles.text} />
                        {/* display min and max */}
                        <View style={styles.optionGroupContainer} >
                            {optionGroup.options.map((option) => {
                                const optionFromChoices = options.filter(element => element.id === option.id)[0] || null
                                return (
                                    <Option data={{ ...option, ...optionFromChoices }} key={'option_' + option.id}
                                            onPress={createOnChangeHandler(optionGroup, option)}
                                            isSelected={!! optionFromChoices}
                                            onQuantityChange={(quantity) => onQuantityChange(option, quantity)}
                                            isQuantifiable={!! optionGroup.options_are_quantifiable}
                                    />
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>

            <LangAwareView style={styles.bottomContainer}>
                <View style={styles.priceAndQuantityContainer}>
                    <RNBounceable ref={(ref: any) => (bounceableMoneyRef = ref)} >
                        <MoneyFormatter data={productPrice(data, count, options)} style={styles.money}/>
                    </RNBounceable>
                    <QuantityButton key={"product-with-options-quantity-button-" + data.id}
                                    data={count}
                                    onPress={(newValue) => setCount(newValue || 1)}
                    />
                </View>
                <View style={styles.confirmButtonContainer}>
                    <RNBounceable onPress={onConfirmPress}>
                        <View style={styles.button}>
                            <TranslatableText style={styles.buttonText} data={'common:confirm'} />
                        </View>
                    </RNBounceable>
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
        height: '86%',
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
        backgroundColor: 'white'
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
    button: {
        borderColor: COLOR_PRIMARY,
        backgroundColor: 'white',
        borderWidth: 0.18,
        borderRadius: 20,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 4,
    },
    buttonText: {
        color: COLOR_PRIMARY,
        fontSize: 19,
        fontWeight: '700',
    }
});
