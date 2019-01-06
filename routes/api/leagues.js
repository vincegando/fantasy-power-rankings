const express = require('express')
const router = express.Router()
const passport = require('passport')
const mongoose = require('mongoose')
const axios = require('axios')

// Load League model
const League = require('../../models/League')

// Validation
const validateLeagueInput = require('../../validation/league')

// @route POST api/leagues
// @desc Create a new league
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validateLeagueInput(req.body)

      // Check validation
      if (!isValid) {
        // send 400 response with errors object
        return res.status(400).json(errors)
      }

      var leagueName
      var teams = []

      await axios
        .get('http://games.espn.com/ffl/api/v2/leagueSettings', {
          params: {
            leagueId: req.body.leagueId
          }
        })
        .then(result => {
          leagueName = result.data.leaguesettings.name
        })
        .catch(err => console.log(err))

      await axios
        .get('http://games.espn.com/ffl/api/v2/standings', {
          params: {
            leagueId: req.body.leagueId,
            seasonId: 2018
          }
        })
        .then(result => {
          // console.log(result.data)
          result.data.teams.map(team => {
            let owners = []
            team.owners.map(owner => {
              owners.push({
                name: owner.firstName + ' ' + owner.lastName
              })
            })

            const newTeam = {
              teamName: team.teamLocation + ' ' + team.teamNickname,
              owners: owners,
              standing: team.overallStanding,
              record: team.record.overallWins + '-' + team.record.overallLosses
            }

            teams.push(newTeam)
          })
        })
        .catch(err => console.log(err))

      League.findOne({ leagueId: req.body.leagueId }).then(league => {
        if (league) {
          if (league.members.indexOf(req.user.id) > -1) {
            errors.leagueId = 'You have already imported/joined this league.'
            return res.status(400).json(errors)
          } else {
            league.members.push(req.user.id)
            league.save().then(league => res.json(league))
          }
        } else {
          const newLeague = new League({
            creator: req.user.id,
            members: [req.user.id],
            leagueId: req.body.leagueId,
            leagueName: leagueName,
            teams: teams
          })

          newLeague.save().then(league => res.json(league))
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
)

// @route GET api/leagues
// @desc Get all leagues for current user
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    League.find({ members: mongoose.Types.ObjectId(req.user.id) })
      .then(leagues => {
        if (leagues) {
          res.json(leagues)
        } else {
          res.json({
            noleagues: 'This user has not imported or joined any leagues yet.'
          })
        }
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route GET api/leagues/:id
// @desc Get league by ESPN id
// @access Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    League.findOne({ leagueId: req.params.id })
      .then(league => res.json(league))
      .catch(err =>
        res.status(404).json({ notfound: 'This league was not found.' })
      )
  }
)

// @route POST api/league/:id
// @desc Update league info by ESPN id
// @access Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    League.findOne({ leagueId: req.params.id })
      .then(league => {
        if (league) {
          if (league.members.indexOf(req.user.id) > -1) {
            // update league name and team info
            league.leagueName = req.body.leagueName

            const teams = JSON.parse(req.body.teams)
            league.teams = teams

            league.save().then(league => res.json(league))
          } else {
            return res.status(401).json({
              notauthorized:
                'You are not authorized to make updates to this league.'
            })
          }
        }
      })
      .catch(err =>
        res.status(404).json({ notfound: 'This league was not found.' })
      )
  }
)

// @route DELETE api/leagues/:id
// @desc Delete a league by given id
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    League.findOne({ leagueId: req.params.id })
      .then(league => {
        if (league.creator.toString() === req.user.id) {
          league.remove().then(() => res.json({ success: true }))
        } else {
          return res.status(401).json({
            notauthorized: 'You are not authorized to delete this league.'
          })
        }
      })
      .catch(err =>
        res.status(404).json({ notfound: 'This league was not found.' })
      )
  }
)

module.exports = router
