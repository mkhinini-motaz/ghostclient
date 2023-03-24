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
import {COLOR_PRIMARY} from "../../constants";

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

const S = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        elevation: 2,
        alignItems: "center"
    },
    tabButton: { flex: 1 },
    spotLight: {
        width: tabWidth,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    spotLightInner: {
        width: 55,
        height: 55,
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 24
    },
    scaler: { flex: 1, alignItems: "center", justifyContent: "center" }
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
    const {
        descriptors,
        activeTintColor,
        inactiveTintColor,
        navigation
    } = props;

    const { routes, index: activeRouteIndex } = navigation.getState();
    return (
        <View style={S.container}>
            <View style={StyleSheet.absoluteFillObject}>
                <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`}>
                    <View style={S.spotLightInner} />
                </SpotLight>
            </View>

            {routes.map((route, routeIndex) => {
                const isRouteActive = routeIndex === activeRouteIndex;
                const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
                const { options } = descriptors[route.key];
                return (
                    <RNBounceable
                        key={routeIndex}
                        style={S.tabButton}
                        onPress={() => {
                            if (isRouteActive && route.state?.routes && route.state?.routes.length > 1) {
                                navigation.goBack()
                            } else {
                                navigation.navigate(route.name, route.params);
                            }
                        }}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                    >
                        <Scaler
                            pose={isRouteActive ? "active" : "inactive"}
                            style={S.scaler}
                        >
                            {renderIcon({ route, focused: isRouteActive, color: isRouteActive ? 'white' : tintColor })}
                        </Scaler>
                    </RNBounceable>
                );
            })}
        </View>
    );
};

export default TabBar;
