const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')

const db = require('./config/keys').mongoURI

const users = require('./routes/api/users')
const leagues = require('./routes/api/leagues')
const rankings = require('./routes/api/rankings')

const app = express()

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CORS
app.use(cors())

mongoose
  .connect(db)
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

port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening on port ${port}...`))
