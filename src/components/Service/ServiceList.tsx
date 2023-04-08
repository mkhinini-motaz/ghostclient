import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Service  from "./Service";
import ServiceClass from "../../classes/Service";
import LangAwareView from "../Common/LangAwareView";

interface ServiceListProps {
    data: ServiceClass[],
}

export default function ServiceList(props: ServiceListProps): JSX.Element {
    const { data } = props;
    const loyaltyService = useMemo(() => new ServiceClass({ en: 'Loyalty', fr: 'Loyalty', tnfr: 'Loyalty', tnar: 'Loyalty', ar: 'Loyalty'}, 'example/service/happyghost.png', []), []);

    return (
        <ScrollView>
            <LangAwareView style={styles.container}>
                <View style={styles.sectionContainer}>
                    <Service data={data[0]} />
                    <Service data={data[2]} />
                    <Service data={data[4]} />
                </View>
                <View style={{...styles.sectionContainer, marginTop: 30}}>
                    <Service data={data[1]} />
                    <Service data={data[3]} />
                    <Service data={loyaltyService}/>
                </View>
            </LangAwareView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
    },
    sectionContainer: {
        flexBasis: 1,
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
});
