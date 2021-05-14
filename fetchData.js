const processData = result =>({
name: `${result.name.first} ${result.name.last}`,
phone: result.phone,
username: result.login.username,
password: result.login.password,
})

const addKey = (val, key) => ({key, ...val})

export const FetchData = async () =>{
const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
const {results} = await response.json()
//body.json() parses the fetched data from JSON into javascript so that it can be used
return results.map(processData).map(addKey);
}

export const login = async (username, password) => {
  const response = await fetch('http://localhost:192.168.2.13:8000', {
    method: 'POST',

    headers: {'content-type': 'application/json'},
    //this line tells where the JSON is going to be

    body: JSON.stringify({username, password}),
  })

  if (response.ok) {
    return true
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
  console.log(errMessage);
}
