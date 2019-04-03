const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const db = require('./config/keys').mongoURI

const users = require('./routes/api/users')
const leagues = require('./routes/api/leagues')
const rankings = require('./routes/api/rankings')

const app = express()

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Route declarations
app.use('/api/users', users)
app.use('/api/leagues', leagues)
app.use('/api/rankings', rankings)

// If in production, use static assets
if (process.env.NODE_ENV === 'production') {
  // Use static folder
  app.use(express.static('client/build'))
  // Use path to entry file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Specify port to listen on
port = process.env.PORT || 5000

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}...`))
