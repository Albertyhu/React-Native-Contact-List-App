const express = require('express')
const bodyParser = require('body-parser')
//Parses the JSON that exist in the body.

const PORT = process.env.PORT || 8000

// usernames are keys and passwords are values
const users = {
  username: 'password',
}

const app = express()
app.use(bodyParser.json())
//Since the body is in JSON, parse it in JSON

//The * means use every single endpoint
//"If you post any endpoints, we're going to run this function "
app.post('*', (req, res) => {
  const {username, password} = req.body

  if (!username || !password) return res.status(400).send('Missing username or password')
  // in practice, this is potentially revealing too much information.
  // an attacker can probe the server to find all of the usernames.
  if (!users[username]) return res.status(403).send('User does not exist')
  if (users[username] !== password) return res.status(403).send('Incorrect password')

  return res.status(200).send()
  //status 200 means everything is okay
})

// catch 404
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => res.status(err.status || 500).send(err.message || 'There was a problem'))

const server = app.listen(PORT)
console.log(`Listening at http://localhost:${PORT}`)
