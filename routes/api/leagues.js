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

      let leagueName
      const teams = []
      const memberInfo = {}
      const currentSeason = 2019

      // Call ESPN's api to get league info (league name, teams, owners, standings, etc)
      await axios
        .get(
          'http://fantasy.espn.com/apis/v3/games/ffl/seasons/' +
            currentSeason +
            '/segments/0/leagues/' +
            req.body.leagueId +
            '?view=mSettings&view=mTeam'
        )
        .then(result => {
          // Set league name
          leagueName = result.data.settings.name

          // Iterate through member info
          result.data.members.map(member => {
            memberInfo[member.id] = member.firstName + ' ' + member.lastName
          })

          // Iterate through league info
          result.data.teams.map(team => {
            const owners = []
            team.owners.map(owner => {
              owners.push({
                name: memberInfo[owner]
              })
            })

            const newTeam = {
              teamName: team.location + ' ' + team.nickname,
              owners: owners,
              standing: team.playoffSeed,
              record:
                team.record.overall.wins + '-' + team.record.overall.losses
            }

            teams.push(newTeam)
          })
        })
        .catch(err => {
          errors.leagueId = `Could not get information from ESPN about league with leagueId: ${req.body.leagueId}`
          return res.status(400).json(errors)
        })

      // Find league by leagueid
      League.findOne({ leagueId: req.body.leagueId }).then(league => {
        if (league) {
          if (league.members.indexOf(req.user.id) > -1) {
            // Already created and joined this league
            errors.leagueId = 'You have already imported/joined this league.'
            return res.status(400).json(errors)
          } else {
            // League has been created, but this user hasn't joined yet
            league.members.push(req.user.id)
            league.save().then(league => res.json(league))
          }
        } else {
          // League hasn't been created yet, create this league
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
    // Find all leagues where this user is a member
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

// @route POST api/leagues/:id
// @desc Update league info by ESPN id
// @access Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = {}
      let leagueName
      const teams = []
      const memberInfo = {}
      const currentSeason = 2019

      // Call ESPN API
      await axios
        .get(
          'http://fantasy.espn.com/apis/v3/games/ffl/seasons/' +
            currentSeason +
            '/segments/0/leagues/' +
            req.params.id +
            '?view=mSettings&view=mTeam'
        )
        .then(result => {
          leagueName = result.data.settings.name

          result.data.members.map(member => {
            memberInfo[member.id] = member.firstName + ' ' + member.lastName
          })

          result.data.teams.map(team => {
            const owners = []
            team.owners.map(owner => {
              owners.push({
                name: memberInfo[owner]
              })
            })

            const updatedTeam = {
              teamName: team.location + ' ' + team.nickname,
              owners: owners,
              standing: team.playoffSeed,
              record:
                team.record.overall.wins + '-' + team.record.overall.losses
            }

            teams.push(updatedTeam)
          })
        })
        .catch(err => {
          errors.leagueId = `Could not get information from ESPN about league with leagueId: ${req.params.id}`
          return res.status(400).json(errors)
        })

      // Find league by leagueId
      League.findOne({ leagueId: req.params.id })
        .then(league => {
          if (league) {
            if (league.members.indexOf(req.user.id) > -1) {
              // League exists, current user is a member, update league name and team info
              league.leagueName = leagueName

              league.teams = teams

              league.save().then(league => res.json(league))
            } else {
              // Current user is not a member of this league
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
    } catch (e) {
      console.log(e)
    }
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
        // Only the user who created the league can delete it
        if (league.creator.toString() === req.user.id) {
          // Current user is the league creator, okay to delete
          league.remove().then(() => res.json({ success: true }))
        } else {
          // Current user is not the league creator
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
