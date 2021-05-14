import React from 'react'
import {View, Text, StyleSheet, SectionList} from 'react-native'
import Row from './row.js'

//const renderItem = obj => (<Row name = {obj.item.name} phone = {obj.item.phone} />)
const renderItem = ({item, index}) => (<Row {...item} />)
const renderSectionHeader = ({section}) => <Text style = {{fontWeight: 'bold',}}>{section.title}</Text>

const ContactList = props =>{
const ContactsByLetter = props.contact.reduce((obj, contact)=>{
    //This line uses the Array.reduce function
    //obj is the Total/Accumulator
    //contact is the Current Value
    //contact iterates through each value of the array as each value are objects carrying both the name and phone number
    //it returns an object?
    const FirstLetter = contact.name[0].toUpperCase();
     //normally, I see functions returning one value, but this is returning two values.
    return{
        ...obj,
        [FirstLetter]: [...(obj[FirstLetter] || []), contact]
    }
}, {})
//The empty curly brackets initializes the variable obj
  //Writing {} means we're starting with an empty object with the reduce() method.On the first iteration, the accumulartor starts with the empty object {} first

  //The following line of code is where the contacts will be grouped by their first letter.
  //Object.keys(contactsByLetter) creates a separate array of keys owned by the array/object contactsByLetter. Those keys will become the elements of the array.
  //Then, for each element in the array of keys, we use the map method to assign properties tile and data to fit how SectionList is coded. These two propties don't exist in this array until it's coded here.
  //contactsByLetter is an array/object that contains arrays of contacts organized into groups

const sections = Object.keys(ContactsByLetter).sort().map(letter => ({
    title: letter,
    data: ContactsByLetter[letter]
          //from the way this is written, each element of array contactsByLetter is an array of contacts with the same upper case letter.
          //New properties can be assigned to an object. This line of code serves to assign the new property data to each nested object
          //contactsByLetter[A] = {{name: albert, phone: 234234523433 }, {name: albert, phone: 234234523433 }, ...}
}))

return(
<SectionList
    keyExtractor={item => item.phone}
    sections = {sections}
    renderItem = {renderItem}
    renderSectionHeader = {renderSectionHeader}
/>
//keyExtractor is necessary so that you don't get the warning about missing keys
)

}

export default ContactList;