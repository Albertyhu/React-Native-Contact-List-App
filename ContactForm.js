import React from 'react'
import {View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView } from 'react-native'

export default class ContactForm extends React.Component {
state= {
    name: '',
    phone: '',
    isValidated: false,
}

componentDidUpdate(prevProps, prevState){
    if(prevState.name !== this.state.name || prevState.phone!== this.state.phone)
        this.validateForm();
}

getHandler = key => val =>{
this.setState({[key]: val})
}

handleNameChange = this.getHandler('name');

/*
handleNameChange = name => {
    this.setState({name})
}*/

handlePhoneChange = phone => {
if(phone.length <= 10 && +phone >= 0 )
    this.setState({phone})
}



submitContact = () =>{
    this.props.onSubmit(this.state);
}

validateForm = () =>{
    const nameArray = this.state.name.split(' ');
    if(nameArray.length >=2  && this.state.phone.length === 10 && nameArray[0] && nameArray[1])
        this.setState(prevState => ({isValidated: !prevState.isValidated, }))
}

render(){
    return(
    <KeyboardAvoidingView behavior = 'padding'>
        <TextInput
        placeholder = 'Name'
        value = {this.state.name}
        onChangeText = {this.handleNameChange}
        />
        <TextInput
        placeholder = 'Phone'
        value = {this.state.phone}
        onChangeText = {this.handlePhoneChange}
        keyboardType = 'numeric'
        />
        <Button title = 'Submit' onPress= {this.submitContact} disabled = {!this.state.isValidated}/>
      </KeyboardAvoidingView>
    )
}
}