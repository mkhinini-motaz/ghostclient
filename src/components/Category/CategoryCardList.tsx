import React, {memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Category from "../../classes/Category";
import CategoryCard from "./CategoryCard";
import {useSelector} from "../../store/hooks";
import CartDisplay from "../Cart/CartDisplay";
import {CART_DISPLAY_HEIGHT} from "../../constants";

interface CategoryCardListProps {
    data: Category[],
}

function CategoryCardList({ data }: CategoryCardListProps): JSX.Element {
    const choices = useSelector((state) => state.Cart.choices);
    const countInCart = (category: Category) => {
        const productIds = category.products.map(product => product.id);
        let count = 0;
        choices.forEach(choice => {
            if (productIds.includes(choice.product_id)) {
                count += choice.product_count;
            }
        });
        return count;
    };

    return (
        <View style={{ position: 'relative', height: '100%' }}>
            <CartDisplay />
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: CART_DISPLAY_HEIGHT + 15 }}>
                    {data.map(category =>
                        <CategoryCard data={category}
                                      countInCart={countInCart(category)}
                                      key={'category_card_' + category.id}
                                      style={{ width: data.length > 3 ? '45%' : '95%', marginHorizontal: '2%' }}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({});

export default memo(CategoryCardList);
