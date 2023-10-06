import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CartNavigator from "./CartNavigator";
import LoyaltyScreen from "../screens/LoyaltyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditPasswordScreen from "../screens/EditPasswordScreen";
import LangScreen from "../screens/LangScreen";
import CustomDrawer from "../components/Common/CustomDrawer";
import {useClient, useLang, useSelector} from "../store/hooks";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../constants";
import {GENDER_FEMALE} from "../classes/Client";
import {StyleSheet, Text, View} from "react-native";
import {choicesCount} from "../classes/Choice";
import TranslatableText from "../components/Common/TranslatableText";
import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";

const screenOptions = (label: string, icon: (iconOptions: { focused: boolean, size: number }) => React.ReactNode) => {
    return {
        drawerActiveBackgroundColor: COLOR_PRIMARY + 'cc',
        drawerLabelStyle: styles.drawerLabel,
        drawerLabel: (labelOptions: { focused: boolean, color: string }) => <TranslatableText data={label} style={{ color: labelOptions.focused ? 'white' : COLOR_PRIMARY, fontSize: 20, fontWeight: 500 }} />,
        drawerIcon: icon
    };
};

const materialIcon = (name: string) =>
    ({focused, size}) => <MaterialIcon name={name} size={size * 1.4} color={focused ? 'white' : COLOR_PRIMARY} />
;

const antIcon = (name: string) =>
    ({focused, size}) => <AntIcon name={name} size={size * 1.4} color={focused ? 'white' : COLOR_PRIMARY} />
;

const simpleLineIcon = (name: string) =>
    ({focused, size}) => <SimpleLineIcon name={name} size={size * 1.4} color={focused ? 'white' : COLOR_PRIMARY} />
;

const cartIcon = (badgeCount: number, selectedLangWriteFrom: 'left'|'right') => ({focused, size}) => {
    const badgeStyle = { ...styles.badge, [selectedLangWriteFrom]: 35, ...(focused ? styles.badgeActive : styles.badgeInactive) };
    return (<>
        <AntIcon name={'shoppingcart'} size={size * 1.4} color={focused ? 'white' : COLOR_PRIMARY} />
        {! badgeCount ? ''  :
            <View style={badgeStyle}>
                <Text style={styles.badgeText}>{badgeCount}</Text>
            </View>
        }
    </>)};

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(): JSX.Element {
    const client = useClient();
    const { selectedLangWriteFrom } = useLang();
    const { choices } = useSelector((state) => state.Cart);
    const badgeCount = choices.length === 0 ? 0 : choicesCount(choices);

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
                          screenOptions={{
                              headerTintColor: COLOR_PRIMARY,
                              drawerPosition: selectedLangWriteFrom,
                          }}
        >
            <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ title: '', ...screenOptions('common:home', antIcon('home')) }} />

            <Drawer.Screen name="CartNavigator" component={CartNavigator} options={screenOptions('common:cart', cartIcon(badgeCount, selectedLangWriteFrom))} />

            <Drawer.Screen name="LoyaltyScreen" component={LoyaltyScreen} options={screenOptions('common:loyalty_program', materialIcon('loyalty'))} />

            <Drawer.Screen name="OrdersScreen" component={OrdersScreen} options={screenOptions('common:orders', materialIcon('shop'))} />

            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={screenOptions('common:profile', simpleLineIcon(client.gender === GENDER_FEMALE ? 'user-female' : 'user'))} />

            <Drawer.Screen name="EditPasswordScreen" component={EditPasswordScreen} options={screenOptions('form:password:update:title', materialIcon('security'))} />

            <Drawer.Screen name="LangScreen" component={LangScreen} options={screenOptions('common:language', materialIcon('language'))} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    tabButton: { flex: 1 },
    scaler: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    badge: {
        position: 'absolute',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        top: 0,
    },
    badgeActive: {
        backgroundColor: COLOR_SECONDARY,
    },
    badgeInactive: {
        backgroundColor: COLOR_PRIMARY,
    },
    badgeText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    drawerLabel: {
        color: COLOR_PRIMARY,
        fontSize: 20,
    }
});
