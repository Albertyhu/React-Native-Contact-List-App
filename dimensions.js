import React from 'react';
import {Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

export default function () {
const {landscape} = useDeviceOrientation();
console.log(useDimensions());
return (
<SafeAreaView >
<View></View>
</SafeAreaView>
)

}
