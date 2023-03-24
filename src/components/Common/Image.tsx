import React from 'react';
import {StyleSheet, View} from 'react-native';
import { COLOR_PRIMARY } from "../../constants";
import * as Progress from "react-native-progress";
import FastImage from 'react-native-fast-image'
import { createImageProgress } from 'react-native-image-progress';

const ImageComponent = createImageProgress(FastImage);

export default function Image(props: any): JSX.Element {
    return (

        <ImageComponent {...props}
               renderIndicator={() => <Progress.Circle size={100} fill={'white'} thickness={15} showsText color={COLOR_PRIMARY} borderWidth={0} />}
        />
    );
};

const styles = StyleSheet.create({});
