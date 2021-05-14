import React from 'react';
import {SectionList, View, Text, StyleSheet} from 'react-native'
import Row from './row.js';

const renderSectionHeader = ({section}) => <Text>{sections.title}</Text>
const renderItem = ({item}) => <Row {...item}/>

const ContactList = props => {
const ContactByLetters = props.contact.reduce((obj, contact) =>{
    const firstLetter = contact.name[0].toUpperCase();
    return{
        ...obj,
        [firstLetter]: [...(obj[firstLetter] || [] ), contact]
    }
}, {})

sections = Object.keys(ContactByLetters).map(letter =>({
    title: [letter],
    data: ContactByLetters[letter]
}))

return(
    <SectionList
    sections = {sections}
    renderItem = {renderItem}
    renderSectionHeader = {renderSectionHeader}
    />
)
}

export default ContactList;