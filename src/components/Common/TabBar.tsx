/* /src/components/TabBar.js */

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from "react-native";
import posed from "react-native-pose";
import Icon from "react-native-vector-icons/AntDesign";
import RNBounceable from "@freakycoder/react-native-bounceable";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../constants";
import {useSelector} from "../../store/hooks";

const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 3;
const SpotLight = posed.View({
    route0: { x: 0 },
    route1: { x: tabWidth },
    route2: { x: tabWidth * 2 },
});

const Scaler = posed.View({
    active: { scale: 1.25 },
    inactive: { scale: 1 }
});


const renderIcon = ({ route, focused, color }) => {
    let iconName;

    if (route.name === 'HomeNavigator') {
        iconName = 'home';
    } else if (route.name === 'CartNavigator') {
        iconName = 'shoppingcart';
    } else if (route.name === 'UserNavigator') {
        iconName = 'setting';
    }

    return <Icon name={iconName} size={30} color={color} />;
};

const TabBar = props => {
    const { descriptors, activeTintColor, inactiveTintColor, navigation, } = props;
    const { routes, index: activeRouteIndex } = navigation.getState();
    const { choices } = useSelector((state) => state.Cart);
    const { selectedLangWriteFrom } = useSelector((state) => state.I18n);

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFillObject}>
                <SpotLight style={styles.spotLight} pose={`route${activeRouteIndex}`}>
                    <View style={styles.spotLightInner} />
                </SpotLight>
            </View>

            <View style={styles.routesContainer}>
                {routes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex;
                    const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
                    const { options } = descriptors[route.key];
                    const badgeStyle = { ...styles.badge, [selectedLangWriteFrom === 'right' ? 'left' : 'right']: -20, ...(isRouteActive ? styles.badgeActive : styles.badgeInactive) };
                    return (
                        <RNBounceable
                            key={routeIndex}
                            style={styles.tabButton}
                            onPress={() => {
                                if (isRouteActive && route.state?.routes && route.state?.routes.length > 1) {
                                    navigation.goBack()
                                } else {
                                    navigation.navigate(route.name, route.params);
                                }
                            }}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                        >
                            <Scaler pose={isRouteActive ? "active" : "inactive"} style={styles.scaler}>
                                <View>
                                    {choices.length === 0 || route.name !== 'CartNavigator' ? ''  :
                                        <View style={badgeStyle}>
                                            <Text style={styles.badgeText}>{choices.length}</Text>
                                        </View>
                                    }
                                    {renderIcon({ route, focused: isRouteActive, color: isRouteActive ? 'white' : tintColor })}
                                </View>
                            </Scaler>
                        </RNBounceable>
                    );
                })}
            </View>
        </View>
    );
};

export default TabBar;


const styles = StyleSheet.create({
    container: {
        height: 75,
        elevation: 2,
        backgroundColor: 'white',
    },
    routesContainer: {
        paddingBottom: 5,
        height: 70,
        flexDirection: "row",
        alignItems: "center",
    },
    tabButton: { flex: 1 },
    spotLight: {
        width: tabWidth,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    spotLightInner: {
        width: 52,
        height: 52,
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 24,
        marginBottom: 10,
    },
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
