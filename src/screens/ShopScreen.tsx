import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import RNBounceable from "@freakycoder/react-native-bounceable";
import {useQuery} from "react-query";
import { category }from "../api/shop";
import CategoryList from "../components/Category/CategoryList";
import {useDispatch, useLang} from "../store/hooks";
import {setCartShop} from "../store/actions/cart";
import FullScreenLoader from "../components/Common/FullScreenLoader";
import {alertNetworkError} from "../support/alert";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {API_CLIENT_URL, COLOR_PRIMARY} from "../constants";
import SearchBar from "../components/Common/SearchBar";
import axios from "axios";

interface ShopScreenProps {
    route: any,
    navigation: any,
}

export default function ShopScreen({ route, navigation }: ShopScreenProps): JSX.Element {
    const dispatch = useDispatch();
    const { selectedLang } = useLang();
    const [search, setSearch] = useState('');
    const shopId = route.params.shopId;
    const { isLoading, error, data } = useQuery(
        ['shop.category', shopId, search],
        () => axios.get(API_CLIENT_URL + 'shop/' + shopId + '/category?search=' + search)
            .then(response => response.data.data),
        {
            onError: (error) => {
                if (error.code === 'ERR_NETWORK') {
                    alertNetworkError(selectedLang);
                    return;
                }
            },
        }
    );

    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const triggerSearch = (searchText) => { setSearch(searchText) };

    useEffect(() => {
        navigation.setOptions({
            headerStyle: { height: 1000 },
            headerBackVisible: true,
            headerRight: () => {
                return searchIsVisible ? undefined : <RNBounceable onPress={() => {
                    setSearchIsVisible(true);
                }}>
                    <AntDesignIcon
                        name="search1"
                        size={30}
                        color={COLOR_PRIMARY}
                        style={{ marginLeft: 1 }}
                    />
                </RNBounceable>;
            },
            headerLeft: () => {
                return ! searchIsVisible ? undefined : <SearchBar onEditEnd={triggerSearch} onClose={() => setSearchIsVisible(false)} visible={searchIsVisible} />
            }
        });
    }, [ searchIsVisible ]);

    useEffect(() => {
        dispatch(setCartShop(shopId));
    }, [shopId, data]);

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (error) {
        // TODO: implement
        return (
            <Text>{JSON.stringify(error)}</Text>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <CategoryList data={data || []} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    },
});
