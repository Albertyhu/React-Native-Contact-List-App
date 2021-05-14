import React from 'react';
import { View, StyleSheet, Text, Button, TextInput, KeyboardAvoidingView} from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './App.js';
import { login } from './fetchData.js';

//function LoginButton
const LoginButton = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const arr  = route.params.contact;
  var doesUserExist = false;
  var validPassword = false;
  function execute(){
    arr.map(contact => {
        if(props.data.username === contact.username){
            doesUserExist = true;
            if(props.data.password === contact.password){
                console.log(`'Welcome back, ${contact.name}'`)
                validPassword = true;
            }
        }
    })
    if(!doesUserExist){
        console.log('Error: Username is either wrong or does not exist')
    }
    else if(doesUserExist && !validPassword){
        console.log('Error: Invalid password')
    }
  }
/*
  async function execute () {
  try{
    //login returns true if username and password are valid
    const success = await login(props.data.username, props.data.password)
    navigation.push("Home");
  } catch (err){
    const errMessage = err.message;
    props.handleErr(errMessage);
  }
  }
  */
  return(
    <Button title = "Login" onPress = {() => {execute()} } />
  )
}

const GoHomeButton = () =>{
const navigation = useNavigation();
return(
    <Button title = 'Go Home' color = 'orange' onPress = {() => {navigation.goBack()} } />
)
}
const Validate = props =>{
const route = useRoute();
const arr = route.params.contact;
function execute(){
    console.log(arr);
}
return(
    <Button title = 'validate' onPress = {() => execute()} />
)
}

export default class Login extends React.Component {
state={
    username: '',
    password: '',
    err: '',
}

_login = async () => {
try {
  const success = await login(this.state.username, this.state.password)
  this.props.navigation.navigate('Home')
  //this line miraculously works and I don't know why

} catch (err) {
  const errMessage = err.message
  this.setState({err: errMessage})
}
}

goHome = () =>{
this.props.navigation.navigate('Home');
}

handleUsernameUpdate = username =>{
   this.setState({username})
    }

handlePasswordUpdate = password => {
    this.setState({password})
}

changeHandler = val => key =>{
this.setState({[key]: value, })
}

updateErr = err =>{
    this.setState({err}
)}


render(){
return(
    <KeyboardAvoidingView behavior = 'padding'>

        <Text style = {loginStyle.error}>{this.state.err}</Text>
        {/*It's has to be spelled 'err' or else it returns nothing.
        //What puzzles me is that I never declared err in state. */}

        <TextInput
            placeholder = "Username"
            value = {this.state.username}
            onChangeText = {this.handleUsernameUpdate}
        />
        <TextInput
            placeholder = 'Password'
            value = {this.state.password}
            onChangeText = {this.handlePasswordUpdate}
        />
       <LoginButton data = {this.state} handleErr = {this.updateErr}/>
      {/* <Button title = 'Login' onPress = {this._login} color = 'blue' /> */}
        {/*} <GoHomeButton /> */}
       <Button title = "Go Home" onPress = {this.goHome} color = 'orange' />
       <Validate />
    </KeyboardAvoidingView>
)
}
}

const loginStyle = StyleSheet.create({
error: {
    textAlign: 'center',
    color: 'red',
},
})