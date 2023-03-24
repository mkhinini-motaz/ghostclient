import React, { useCallback, useRef } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CategoryClass from "../../classes/Category";
import Category from "./Category";
import CategoryHorizontal from "./CategoryHorizontal";
import {useSelector} from "../../store/hooks";

interface CategoryListProps {
    data: CategoryClass[],
}


export default function CategoryList({ data }: CategoryListProps): JSX.Element {
    const { selectedLangWriteFrom } = useSelector((state) => state.I18n);
    const horizontalFlatListRef = useRef();
    const renderVerticalItem = useCallback(({ item }) => <Category data={item} key={'category_' + item.id} />, []);
    const verticalKeyExtractor = useCallback(category => 'category_show_' + category.id, []);
    const getVerticalItemLayout = useCallback((data, index) => {
        const length = 67 + 130 * data[index].products.length;
        let offset = 0;
        for (let i = 0; i < index; i++) {
            offset +=  67 + 140 * data[i].products.length;
        }
        return { length, offset, index };
    }, []);

    const renderHorizontalItem = useCallback(({ item, index }) => <CategoryHorizontal onPress={() => {
        horizontalFlatListRef.current.scrollToIndex({index})
    }} data={item} key={'category_text_' + item.id} />, []);
    const horizontalKeyExtractor = useCallback(category => 'category_show_' + category.id, []);

    return (
        <View style={{position: 'relative'}}>
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
                ref={horizontalFlatListRef}
                contentContainerStyle={{ paddingBottom: 220, paddingTop: 50 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});
