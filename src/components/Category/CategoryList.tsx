import React from 'react';
import {StyleSheet, View} from 'react-native';
import CategoryClass from "../../classes/Category";
import Category from "./Category";

interface CategoryListProps {
    data: CategoryClass[],
}

export default function CategoryList({ data }: CategoryListProps): JSX.Element {
    return (
        <View>
            {data.map(category => <Category data={category} key={'category_' + category.id} />)}
        </View>
    );
};

const styles = StyleSheet.create({});
