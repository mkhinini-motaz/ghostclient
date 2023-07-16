import React from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonField from "../Form/ButtonField";
import LangAwareView from "../Common/LangAwareView";
import TextField from "../Form/TextField";
import {useDispatch, useSelector} from "../../store/hooks";
import {setAdditionalNote} from "../../store/actions/cart";

interface AdditionalNoteProps {

}

export default function AdditionalNote({}: AdditionalNoteProps): JSX.Element {
    const dispatch = useDispatch();
    const { additionalNote } = useSelector((state) => state.Cart);
    const onChange = (newValue) => {
        dispatch(setAdditionalNote(newValue));
    };

    return (
        <View style={styles.container}>
            <TextField value={additionalNote} onChange={onChange} label={'cart:additional_note:label'} multiline />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    text: {
        fontSize: 18,
    },
});
