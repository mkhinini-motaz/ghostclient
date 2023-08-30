import React, {memo, useState, forwardRef, useRef, useEffect} from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {translate} from "../../i18n";
import {useLang} from "../../store/hooks";
import {debounce} from "../../support/utils";

interface SearchBarProps {
    onEditEnd: (text: string) => void,
    onClose: () => void,
    visible: boolean,
}

function SearchBar({ onEditEnd, onClose, visible }: SearchBarProps): JSX.Element {
    const { selectedLang } = useLang();
    const [searchPhrase, setSearchPhrase] = useState("");
    const debouncedOnEditEnd = debounce(onEditEnd, 700);
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (visible) {
            searchInputRef.current.focus();
        }
    }, [visible]);

    return (
        <View style={styles.container}>
            <View style={styles.searchBar__clicked}>
                <AntDesignIcon
                    name="search1"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search" // TODO: better translated word
                    value={searchPhrase}
                    ref={searchInputRef}
                    onChangeText={(newText) => {
                        setSearchPhrase(newText);
                        debouncedOnEditEnd(newText);
                    }}
                />
                <AntDesignIcon name="close" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                    setSearchPhrase('');
                    debouncedOnEditEnd('');
                }}/>
            </View>

            <View>
                <Button
                    title={translate('common:cancel', selectedLang)}
                    onPress={() => {
                        Keyboard.dismiss();
                        setSearchPhrase('');
                        debouncedOnEditEnd('');
                        onClose();
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",

    },
    searchBar__clicked: {
        padding: 5,
        flexDirection: "row",
        width: "65%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "75%",
    },
});

export default memo(SearchBar);
