import React from "react";
import { View, StyleSheet, Dimensions, } from "react-native";
import posed from "react-native-pose";
import { COLOR_PRIMARY, } from "../../constants";
import { useSelector } from "../../store/hooks";
import TabBarItem from "./TabBarItem";
import {choicesCount} from "../../classes/Choice";

const WINDOW_WIDTH = Dimensions.get("window").width;
const TAB_WIDTH = WINDOW_WIDTH / 3;

const SpotLight = posed.View({
    route0: { x: 0 },
    route1: { x: TAB_WIDTH },
    route2: { x: TAB_WIDTH * 2 },
});

const TabBar = props => {
    const { descriptors, activeTintColor, inactiveTintColor, navigation, } = props;
    const { routes, index: activeRouteIndex } = navigation.getState();
    const { choices } = useSelector((state) => state.Cart);

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
                    return <TabBarItem key={route.key}
                                       route={route}
                                       isRouteActive={isRouteActive}
                                       tintColor={isRouteActive ? activeTintColor : inactiveTintColor}
                                       navigation={navigation}
                                       badgeCount={choices.length === 0 || route.name !== 'CartNavigator' ? '' : choicesCount(choices)}
                    />;
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
        width: TAB_WIDTH,
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
});
