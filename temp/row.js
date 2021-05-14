import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const rowStyle = StyleSheet.create({
container:{
    paddingTop: 10,
    paddingBottom: 10,
},
})

const Row = props => (
    <View style={rowStyle.container} >
        <Text>{props.name}</Text>
        <Text>{props.phone}</Text>
    </View>
)


export default Row;