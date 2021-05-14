import React from 'react';
import {Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import Constant from 'expo-constants';
import contacts, {compareNames} from './contacts.js';
import Row from './row.js';
import ContactList from './contactlist.js';

const mainStyle = StyleSheet.create({
    container: {
        paddingTop: Constant.statusBarHeight,
    },
})

export default class App extends React.Component{
constructor() {
super()
this.state={
    contact: contacts,
    showList: true,
};
}

componentDidMount(){
    this.sort();
}

sort = () => {
    this.setState(prevState => ({contact: prevState.contact.sort(compareNames), }))
}

toggleList = () => {
    this.setState(prevState => ({showList: !prevState.showList,}))
}

render(){
    return(
    <View style = {mainStyle.container}>
      <Button title = "Toggle List" onPress = {this.toggleList} />
      <ScrollView>
        {this.state.showList && (this.state.contact.map(val => <Row name = {val.name} phone = {val.phone} key = {val.key} /> ))}
       </ScrollView>
     /*<ContactList contact={this.state.contact} />*/
    </View>
        )
    }
}