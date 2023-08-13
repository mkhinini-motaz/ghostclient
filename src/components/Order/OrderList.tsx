import React, {memo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import OrderClass from "../../classes/Order";
import Choice from "./Choice";
import Order from "./Order";

interface OrderListProps {
    data: OrderClass[],
}

function OrderList({ data }: OrderListProps): JSX.Element {
    return (
        <View>
            <FlatList
                initialNumToRender={5}
                data={data}
                renderItem={({ item, index }) => <Order data={item} key={'order_' + item.id}  />}
                keyExtractor={order => 'order_' + order.id}
                contentContainerStyle={{ paddingBottom: 15, }}
            />
        </View>
    );
}

const styles = StyleSheet.create({});

export default memo(OrderList);
