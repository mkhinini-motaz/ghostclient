import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import OptionGroup from "../../classes/OptionGroup";
import OptionClass, {DEFAULT_QUANTITY} from "../../classes/Option";
import TranslatableText from "../Common/TranslatableText";
import {COLOR_PRIMARY} from "../../constants";
import {translate} from "../../i18n";
import Option from "./Option";

interface OptionGroupsProps {
    data: OptionGroup[],
}

export default function OptionGroups({ data }: OptionGroupsProps): JSX.Element {
    const [ options, setOptions ] = useState<OptionClass[]>([]);
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
        setOptions(newOptions);
// TODO:replace            props.onChange(newOptions);
    };

    useEffect(() => {
        const defaultOptions = [];
        for (let optionGroup of data) {
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
            {data.map(optionGroup => (
                <View key={'option_group_' + optionGroup.id}>
                    <TranslatableText data={optionGroup.name} style={styles.text} />
                    <View style={styles.optionGroupContainer} >
                        {optionGroup.options.map(option => (
                            <Option data={option} key={'option_' + option.id}
                                    onPress={createOnChangeHandler(optionGroup, option)}
                                    isSelected={!! options.filter(element => element.id === option.id).length}
                            />
                        ))}
                    </View>
                </View>
            ))}

            <View style={styles.buttonContainer}>
                <Button title={translate('common:confirm', 'fr')}
                        onPress={() => console.log(options)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    optionGroupContainer: {
        padding: 10,
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
    buttonContainer: {
        padding: 10,
        marginBottom: 10,
    },
});
