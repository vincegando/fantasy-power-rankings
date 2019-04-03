const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../../config/keys').secretOrKey
const passport = require('passport')

// Load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')

// @route POST api/users/register
// @desc Register a user
// @access Public
router.post('/register', (req, res) => {
  // Load validation info
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Find user by email
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // User already exists
      errors.email = 'This email has already been registered.'
      return res.status(400).json(errors)
    } else {
      // User doesn't exist, create a new user
      User.findOne({ username: req.body.username }).then(user => {
        if (user) {
          errors.username = 'This username already exists.'
          return res.status(400).json(errors)
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err
              const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
              })
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err))
            })
          })
        }
      })
    }
  })
})

// @route POST api/users/login
// @desc Login a user
// @access public
router.post('/login', (req, res) => {
  // Load validation info
  const { errors, isValid } = validateLoginInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find user by email
  User.findOne({ email: email }).then(user => {
    if (!user) {
      // No user matching that email
      errors.email = 'User not found.'
      return res.status(400).json(errors)
    } else {
      // Found the correct user, check if password is correct
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email
          }

          jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
        } else {
          errors.password = 'Password incorrect.'
          res.status(400).json(errors)
        }
      })
    }
  })
})

// @route GET api/users/current
// @desc Get current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    })
  }
)

module.exports = router
