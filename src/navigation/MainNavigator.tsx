import React from 'react';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import Icon from 'react-native-vector-icons/AntDesign';
import {COLOR_PRIMARY} from "../constants";
import RNBounceable from "@freakycoder/react-native-bounceable";
import {translate} from "../i18n";
import {useSelector} from "../store/hooks";
import {Alert, Animated, StyleSheet, TouchableOpacity, View} from "react-native";

export default function MainNavigator(): JSX.Element {
    const { selectedLangWriteFrom } = useSelector((state) => state.I18n);
    const Tab = createBottomTabNavigator();

    const _renderIcon = (routeName, selectedTab) => {
        let iconName;

        if (routeName === 'HomeNavigator') {
            iconName = 'home';
        } else if (routeName === 'CartNavigator') {
            iconName = 'shoppingcart';
        } else if (routeName === 'UserNavigator') {
            iconName = 'setting';
        }

        return <Icon name={iconName} size={40} color={routeName === selectedTab ? COLOR_PRIMARY : 'gray'} />;
    };

    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        return (
            <RNBounceable
                style={styles.tabbarItem}
                onPress={() => navigate(routeName)}
            >
                {_renderIcon(routeName, selectedTab)}
            </RNBounceable>
        );
    };

    const renderCircle = ({ selectedTab, navigate }) => (
            <RNBounceable
                style={{ ...styles.btnCircleUp, backgroundColor: 'CartNavigator' === selectedTab ? COLOR_PRIMARY : 'white' }}
                onPress={() => navigate('CartNavigator')}
            >
                <View style={styles.button}>
                    <Icon name={'shoppingcart'} color={'CartNavigator' === selectedTab ? 'white' : 'gray'} size={40} />
                </View>
            </RNBounceable>
    );

    return (
        <NavigationContainer >
            <CurvedBottomBar.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                })}
                shadowStyle={styles.shawdow}
                circleWidth={80}
                bgColor="white"
                borderTopLeftRight
                renderCircle={renderCircle}
                tabBar={renderTabBar}
            >
                <CurvedBottomBar.Screen position={selectedLangWriteFrom.toUpperCase()} name="HomeNavigator" component={HomeNavigator} />
                <CurvedBottomBar.Screen position={"CIRCLE"} name="CartNavigator" component={CartNavigator} />
                <CurvedBottomBar.Screen position={selectedLangWriteFrom === 'left' ? "RIGHT" : "LEFT"} name="UserNavigator" component={UserNavigator} />
            </CurvedBottomBar.Navigator>
        </NavigationContainer>
    );
}

export const styles = StyleSheet.create({
    shawdow: {
        shadowColor: '#777',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    btnCircleUp: {
        width: 65,
        height: 60,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        bottom: 24,
        shadowColor: '#777',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 1,
    },
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
});
