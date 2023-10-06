import React, {memo, useCallback} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {alertConfirmLogout} from "../../support/alert";
import {setClientToken} from "../../support/auth";
import {useClient, useLang, useSetClient} from "../../store/hooks";
import {translate} from "../../i18n";
import {COLOR_PRIMARY} from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import {DrawerNavigationState, ParamListBase} from "@react-navigation/native";
import {DrawerDescriptorMap, DrawerNavigationHelpers} from "@react-navigation/drawer/lib/typescript/src/types";
import Logo from "./Logo";

interface CustomDrawerProps {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
}

function CustomDrawer(props: CustomDrawerProps): JSX.Element {
    const setClient = useSetClient();
    const { selectedLang } = useLang();

    const onLogoutPress = useCallback(() => {
        alertConfirmLogout(
            selectedLang,
            () => setClientToken('')
                .then(() => setClient({}))
        );
    }, []);

    return (
        <DrawerContentScrollView {...props}>
            <Logo />
            <DrawerItemList {...props} />
            <DrawerItem icon={() => <Icon size={24 * 1.4}
                        name={'logout'}
                        color={COLOR_PRIMARY} />}
                        label={translate('common:logout', selectedLang)}
                        labelStyle={styles.label}
                        onPress={onLogoutPress}
            />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    label: {
        color: COLOR_PRIMARY,
        fontSize: 20,
    },
});

export default memo(CustomDrawer);
