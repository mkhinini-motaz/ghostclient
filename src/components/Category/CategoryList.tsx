import React, { useCallback, useRef } from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import CategoryClass from "../../classes/Category";
import Category from "./Category";
import TranslatableText from "../Common/TranslatableText";
import CategoryHorizontal from "./CategoryHorizontal";

interface CategoryListProps {
    data: CategoryClass[],
}


export default function CategoryList({ data }: CategoryListProps): JSX.Element {
    const horizontalFlatListRef = useRef();
    const renderVerticalItem = useCallback(({ item }) => <Category data={item} key={'category_' + item.id} />, []);
    const verticalKeyExtractor = useCallback(category => 'category_show_' + category.id, []);
    const getVerticalItemLayout = useCallback((data, index) => {
        const length = 67 + 130 * data[index].products.length;
        let offset = 0;
        for (let i = 0; i < index; i++) {
            offset +=  67 + 130 * data[i].products.length;
        }
        return { length, offset, index };
    }, []);

    const renderHorizontalItem = useCallback(({ item, index }) => <CategoryHorizontal onPress={() => {
        horizontalFlatListRef.current.scrollToIndex({index})
    }} data={item} key={'category_text_' + item.id} />, []);
    const horizontalKeyExtractor = useCallback(category => 'category_show_' + category.id, []);

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderHorizontalItem}
                keyExtractor={horizontalKeyExtractor}
                horizontal
            />
            <FlatList
                maxToRenderPerBatch={2}
                initialNumToRender={1}
                data={data}
                renderItem={renderVerticalItem}
                keyExtractor={verticalKeyExtractor}
                getItemLayout={getVerticalItemLayout}
                ref={horizontalFlatListRef}
            />
        </View>
    );
};

const styles = StyleSheet.create({});
