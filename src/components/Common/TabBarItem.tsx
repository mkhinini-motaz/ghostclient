import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNBounceable from "@freakycoder/react-native-bounceable";
import posed from "react-native-pose";
import Icon from "react-native-vector-icons/AntDesign";
import {useSelector} from "../../store/hooks";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";

interface TabBarItemProps {
    route: object,
    tintColor: string,
    isRouteActive: boolean,
    navigation: any,
    badgeCount: number,
}

interface RenderIconParams {
    route: object,
    focused: boolean,
    color: string,
}

const renderIcon = ({ route, focused, color } : RenderIconParams) => {
    let iconNames = { HomeNavigator: 'home', CartNavigator: 'shoppingcart', UserNavigator: 'setting', };

    return <Icon name={iconNames[route.name] || ''} size={30} color={color} />;
};

const Scaler = posed.View({
    active: { scale: 1.25 },
    inactive: { scale: 1 }
});

export default function TabBarItem({ route, isRouteActive, tintColor, navigation, badgeCount }: TabBarItemProps): JSX.Element {
    const { selectedLangWriteFrom } = useSelector((state) => state.I18n);
    const badgeStyle = { ...styles.badge, [selectedLangWriteFrom === 'right' ? 'left' : 'right']: -20, ...(isRouteActive ? styles.badgeActive : styles.badgeInactive) };
    const onPress = useCallback(() => {
        (isRouteActive && route.state?.routes && route.state?.routes.length > 1) ?
            navigation.goBack() :
            navigation.navigate(route.name, route.params);
    }, [route.key, route.state?.routes.length]);

    return (
        <RNBounceable style={styles.tabButton} onPress={onPress} >
            <Scaler pose={isRouteActive ? "active" : "inactive"} style={styles.scaler}>
                <View>
                    {! badgeCount ? ''  :
                        <View style={badgeStyle}>
                            <Text style={styles.badgeText}>{badgeCount}</Text>
                        </View>
                    }
                    {renderIcon({ route, focused: isRouteActive, color: isRouteActive ? 'white' : tintColor })}
                </View>
            </Scaler>
        </RNBounceable>
    );
};



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
        top: -20,
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
});
