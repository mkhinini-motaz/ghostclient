import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Service  from "./Service";
import ServiceClass from "../../classes/Service";

interface ServiceListProps {
    data: ServiceClass[],
}

export default function ServiceList(props: ServiceListProps): JSX.Element {
    const { data } = props;
    const loyaltyService = useMemo(() => new ServiceClass({ en: 'Loyalty', fr: 'Loyalty', tnfr: 'Loyalty', tnar: 'Loyalty', ar: 'Loyalty'}, 'example/service/loyalty.png', []), []);

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.sectionContainer}>
                    <Service data={data[0]} />
                    <Service data={data[2]} />
                </View>
                <View style={{...styles.sectionContainer, marginTop: 30}}>
                    <Service data={data[1]} />
                    <Service data={loyaltyService}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
    },
    subContainer: {
        flexDirection: 'row',
    },
    sectionContainer: {
        flexBasis: 1,
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
});
