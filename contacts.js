const NUM_CONTACTS = 100

const firstNames = ['Emma','Noah','Olivia','Liam','Ava','William','Sophia','Mason','Isabella','James','Mia','Benjamin','Charlotte','Jacob','Abigail','Michael','Emily','Elijah','Harper','Ethan','Amelia','Alexander','Evelyn','Oliver','Elizabeth','Daniel','Sofia','Lucas','Madison','Matthew','Avery','Aiden','Ella','Jackson','Scarlett','Logan','Grace','David','Chloe','Joseph','Victoria','Samuel','Riley','Henry','Aria','Owen','Lily','Sebastian','Aubrey','Gabriel','Zoey','Carter','Penelope','Jayden','Lillian','John','Addison','Luke','Layla','Anthony','Natalie','Isaac','Camila','Dylan','Hannah','Wyatt','Brooklyn','Andrew','Zoe','Joshua','Nora','Christopher','Leah','Grayson','Savannah','Jack','Audrey','Julian','Claire','Ryan','Eleanor','Jaxon','Skylar','Levi','Ellie','Nathan','Samantha','Caleb','Stella','Hunter','Paisley','Christian','Violet','Isaiah','Mila','Thomas','Allison','Aaron','Alexa','Lincoln']

const lastNames = ['Smith','Jones','Brown','Johnson','Williams','Miller','Taylor','Wilson','Davis','White','Clark','Hall','Thomas','Thompson','Moore','Hill','Walker','Anderson','Wright','Martin','Wood','Allen','Robinson','Lewis','Scott','Young','Jackson','Adams','Tryniski','Green','Evans','King','Baker','John','Harris','Roberts','Campbell','James','Stewart','Lee','County','Turner','Parker','Cook','Mc','Edwards','Morris','Mitchell','Bell','Ward','Watson','Morgan','Davies','Cooper','Phillips','Rogers','Gray','Hughes','Harrison','Carter','Murphy']
// generate a random number between min and max
//(max - min + 1) returns a range of numbers between max and min, including max and min itself
//Math.floor(Math.random() * (max - min + 1)) + min; by adding the last min, the max number is included.
const rand = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

// generate a name
const generateName = () =>  `${firstNames[rand(firstNames.length - 1)]} ${lastNames[rand(lastNames.length - 1)]}`

// generate a phone number
const generatePhone = () => `(${rand(999, 100)}) ${rand(999, 100)} - ${rand(9999, 1000)}`

// create a person
const generateContact = () => ({name: generateName(), phone: generatePhone()})

// Used to compare the first names of two contacts for alphabetizing. This statement returns true if contact1.name precedes contact2.name
//Used for the function sort()
export const compareNames = (contact1, contact2) => contact1.name.toUpperCase() > contact2.name.toUpperCase()


// add keys to based on index
/*
const addKeys = (contacts, key)=> ({
  key: key,
  name: contacts.name,
  phone: contacts.phone,
});

const addKeys = (val, key) => ({
  key: key,
  ...val,
});

const addKeys =(val, key) => ({key: key, ...val});
*/
//short hand way of expressing the above code
//The order in which val and key is written in the parameter matters. Why?
//It's because it's written to abide by how Array.map() is coded.
// Syntax for array.map: array.map(function(currentValue, index, arr), thisValue)
//array.map(function(currentValue, index, arr), thisValue)
//This part in necessary if you want the app to sort the organization of the elements correctly.
// The part "...val" is called object destructuring and it clones all the values that corresponds with the particular key, which are name and phone.
const addKey = (val, key) => ({key, ...val})

// Array.from creates an array of length NUM_CONTACTS and alphabetize by name
// My guess is that {length: NUM_CONTACTS} creates an empty array with the length of NUM_CONTACTS
export default Array.from({length: NUM_CONTACTS}, generateContact).map(addKey)