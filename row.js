import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const rowStyle = StyleSheet.create({
container:{
    paddingTop: 10,
    paddingBottom: 10,
},
})

const Row = props => (
    <View style = {rowStyle.container} >
        <Text>{props.name}</Text>
        <Text>{props.phone}</Text>
        <Text>{props.username}</Text>
        <Text>{props.password}</Text>
    </View>
)

//You may want to add key = {props.key} to <View> tag if you get warning message about missing keys

export default Row;