import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import OptionGroup from "../../classes/OptionGroup";
import TranslatableText from "../Common/TranslatableText";
import {COLOR_PRIMARY} from "../../constants";
import Option from "./Option";
import {translate} from "../../i18n";

interface OptionGroupsProps {
    data: OptionGroup[],
}

export default function OptionGroups({ data }: OptionGroupsProps): JSX.Element {
    return (
        <View>
            {data.map(optionGroup => (
                <View key={'option_group_' + optionGroup.id}>
                    <TranslatableText data={optionGroup.name} style={styles.text} />
                    <View style={styles.optionGroupContainer} >
                        {optionGroup.options.map(option => (
                            <Option data={option} key={'option_' + option.id} />
                        ))}
                    </View>
                </View>
            ))}

            <View style={styles.buttonContainer}>
                <Button title={translate('common:confirm', 'fr')} />
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
