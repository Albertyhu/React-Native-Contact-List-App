import React from 'react';
import {View, Text, ScrollView, StyleSheet, Button, Image, TouchableOpacity} from 'react-native';
import contacts, {compareNames} from './contacts.js';
import Constant from 'expo-constants';
import Row from './row.js';
import ContactList from './ContactList.js';
import ContactForm from './ContactForm.js';
import ContactForm1 from './ContactForm1.js';
import Dimensions from './dimensions.js';
import {FetchData} from './fetchData.js';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Login from './login.js';

const appStyle = StyleSheet.create({
container:{
    paddingTop: Constant.statusBarHeight,
},

})

const Navigate = createStackNavigator();

export default function App (){
return(
    <NavigationContainer>
        <Navigate.Navigator>
            <Navigate.Screen name = "Home" component = {Home} />
            <Navigate.Screen name = "ContactForm1" component = {ContactForm1} option = {{ title: 'Add Contact' }}/>
            <Navigate.Screen name = "Login" component = {Login} option = {{ title: 'Login' }}/>
        </Navigate.Navigator>
    </NavigationContainer>
)
}

const AddContactButton = props =>{
const Navigation = useNavigation();
    return(
        <Button
        title = "Add Contact"
        onPress = {() => {Navigation.push('ContactForm1',
        {onSubmit: props.onSubmit }) }} />
    )
}

const LoginButton = props => {
    const Navigation = useNavigation();
    return(
        <Button title = 'Login' color = 'tomato' onPress = {() => {Navigation.push('Login', {contact: props.contact})}} />
    )
}

class Home extends React.Component {
constructor(){
    super();
    this.state={
        contact: [],
        displayList: true,
        displayContact: false,
    }
}

addContact = newContact => {
    this.setState(prevState => ({ contact: [...prevState.contact, newContact], displayContact: false}));
    this.sort();
}

fetchUsers = async () =>{
    const results = await FetchData();
    this.setState({contact: results})
    this.sort();
}

componentDidMount(){
    this.fetchUsers();
}

process = result => ({
name: `${result.name.first} ${result.name.last}`,
phone: result.phone,
})

sort = () => {
    this.setState(prevState =>({contact: prevState.contact.sort(compareNames)}))
}

toggleContact = () => {
    this.setState(prevState => ({displayContact: !prevState.displayContact, }))
}

toggleList = () => {
    this.setState(prevState => ({displayList: !prevState.displayList, }))
}

render(){
return(
    <View style = {appStyle.container}>
        <LoginButton contact = {this.state.contact} />
        <Button color = 'orange' title = 'Toggle List' onPress = {this.toggleList} />
      {/*  <Button title = 'Add Contact' onPress = {this.toggleContact} /> */}
        <AddContactButton onSubmit = {this.addContact} />
      {/*} {this.state.displayContact && <ContactForm1 onSubmit = {this.addContact} /> } */}
        <View style = {appStyle.container2}>
           {this.state.displayList && (<ContactList contact = {this.state.contact} />) }
        </View>
    </View>
)
}
}