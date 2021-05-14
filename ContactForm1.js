import React from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CancelButton = () =>{
const Navigation = useNavigation();
return(
    <Button title = 'Cancel' onPress= {() => {Navigation.goBack()} }/>
    )
}

const SubmitButton = (props) =>{
const Navigation = useNavigation();
const route = useRoute();
// useRoute() hook is what makes it possible to pass props and trigger the onSubmit event
//refer to: https://reactnavigation.org/docs/use-route
function execute() {
    route.params.onSubmit(props.data);
    Navigation.goBack();
}
return(
    <Button
        title = 'Submit'
        color = 'orange'
        onPress = { () => {execute()} }
        disabled = {!props.data.isValid}
    />
)
}

export default class ContactForm extends React.Component {
state={
name: '',
phone: '',
isValid: false,
}

componentDidUpdate(prevProps, prevState){
    if(this.state.name !== prevState.name || this.state.phone !== prevState.phone){
        this.validate();
    }
}

getHandler = key => val => {
    this.setState({[key]: val})
}

nameChange = this.getHandler('name')

phoneChange = phone =>{
    if(phone.length <= 10 && +phone > 0)
        this.setState({phone})
}

handleSubmit = () => {
    this.props.onSubmit(this.state);
}

validate =() =>{
    const nameArray = this.state.name.split(' ');
    if(!nameArray[0] || !nameArray[1] || nameArray.length < 2 || this.state.phone.length !== 10)
        this.setState({isValid: false})
    else
        this.setState({isValid: true})
}

render() {
return(
    <KeyboardAvoidingView behavior = 'padding'>
    <TextInput
        value = {this.state.name}
        placeholder = 'Name'
        onChangeText = {this.nameChange}

    />
     <TextInput
        value = {this.state.phone}
        placeholder = 'Phone'
        onChangeText = {this.phoneChange}
        keyboardType= 'numeric'
        />
     {/* <Button title = 'Submit' onPress = {this.handleSubmit} disabled = {!this.state.isValid} /> */}
     <SubmitButton data = {this.state} />
     <CancelButton />
    </KeyboardAvoidingView>
)
}


}