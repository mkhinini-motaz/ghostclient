import React, { useCallback, useRef } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CategoryClass from "../../classes/Category";
import Category from "./Category";
import CategoryHorizontal from "./CategoryHorizontal";
import { useLang, } from "../../store/hooks";
import {CART_DISPLAY_HEIGHT} from "../../constants";
import CartDisplay from "../Cart/CartDisplay";

interface CategoryListProps {
    data: CategoryClass[],
}

export default function CategoryList({ data }: CategoryListProps): JSX.Element {
    const { selectedLangWriteFrom } = useLang();
    const verticalFlatListRef = useRef();
    const renderVerticalItem = useCallback(({ item }) => <Category data={item} key={'category_' + item.id} />, []);
    const verticalKeyExtractor = useCallback(category => 'category_show_' + category.id, []);
    const getVerticalItemLayout = useCallback((data, index) => {
        const length = 67 + 140 * data[index].products.length;
        let offset = 0;
        for (let i = 0; i < index; i++) {
            offset +=  67 + 150 * data[i].products.length;
        }
        return { length, offset, index };
    }, []);

    const renderHorizontalItem = useCallback(({ item, index }) => <CategoryHorizontal onPress={() => {
        verticalFlatListRef.current.scrollToIndex({index})
    }} data={item} key={'category_text_' + item.id} />, []);
    const horizontalKeyExtractor = useCallback(category => 'category_show_' + category.id, []);

    return (
        <View style={{position: 'relative'}}>
            <CartDisplay />
            <FlatList
                data={data}
                renderItem={renderHorizontalItem}
                keyExtractor={horizontalKeyExtractor}
                horizontal
                inverted={selectedLangWriteFrom === 'right'}
                style={{ position: 'absolute', zIndex: 2 }}
            />
            <FlatList
                maxToRenderPerBatch={2}
                initialNumToRender={2}
                data={data}
                renderItem={renderVerticalItem}
                keyExtractor={verticalKeyExtractor}
                getItemLayout={getVerticalItemLayout}
                ref={verticalFlatListRef}
                contentContainerStyle={{ paddingBottom: CART_DISPLAY_HEIGHT + 15, paddingTop: 50 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});
