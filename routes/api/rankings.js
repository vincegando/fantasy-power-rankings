const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Ranking model
const Ranking = require('../../models/Ranking')
// Load League model
const League = require('../../models/League')

// Validation
const validateRankingInput = require('../../validation/ranking')

// @route POST api/rankings
// @desc Create a new ranking
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRankingInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    League.findOne({ leagueId: req.body.leagueId })
      .then(league => {
        if (!league) {
          return res
            .status(404)
            .json({ notfound: 'This league was not found.' })
        } else {
          // TODO: Prevent more than one ranking per week ?
          if (!(league.members.indexOf(req.user.id) > -1)) {
            return res.status(400).json({
              notauthorized:
                'You are not authorized to make rankings for this league.'
            })
          } else {
            const newRanking = new Ranking({
              leagueId: league.leagueId,
              title: req.body.title,
              rankings: req.body.rankings,
              author: req.user.id
            })

            newRanking.save().then(ranking => res.json(ranking))
          }
        }
      })
      .catch(err => res.status(400).json(err))
  }
)

// @route POST api/rankings/:id
// @desc Update a ranking
// @access Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRankingInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    Ranking.findOne({ _id: req.params.id })
      .then(ranking => {
        if (!ranking) {
          return res
            .status(404)
            .json({ notfound: 'This ranking was not found.' })
        } else {
          if (ranking.author.toString() === req.user.id) {
            const rankings = JSON.parse(req.body.rankings)

            ranking.rankings = rankings
            ranking.title = req.body.title
            ranking.save().then(ranking => res.json(ranking))
          } else {
            return res.status(401).json({
              notauthorized: 'You are not authorized to edit this ranking.'
            })
          }
        }
      })
      .catch(err => res.status(400).json(err))
  }
)

// @route DELETE api/rankings/:id
// @desc Delete a ranking
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Ranking.findOne({ _id: req.params.id })
      .then(ranking => {
        if (!ranking) {
          return res
            .status(404)
            .json({ notfound: 'This ranking was not found.' })
        } else {
          if (ranking.author.toString() === req.user.id) {
            ranking.remove().then(() => res.json({ success: true }))
          } else {
            return res.status(401).json({
              notauthorized: 'You are not authorized to delete this ranking.'
            })
          }
        }
      })
      .catch(err => res.status(400).json(err))
  }
)

// @route GET api/ranking/:id
// @desc Get a ranking by its id
// @access Public ?
router.get('/:id', (req, res) => {
  Ranking.findOne({ _id: req.params.id })
    .then(ranking => {
      if (!ranking) {
        return res.status(404).json({ notfound: 'This ranking was not found.' })
      } else {
        res.json(ranking)
      }
    })
    .catch(err => res.status(400).json(err))
})

// @route GET api/rankings/league/:leagueId
// @desc Get all rankings belonging to a specified league
// @access Private
router.get(
  '/league/:leagueId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Ranking.find({ leagueId: req.params.leagueId })
      .populate('author', ['username'])
      .then(rankings => {
        if (!rankings) {
          return res.json({
            norankings: 'There are no rankings for this league.'
          })
        } else {
          return res.json(rankings)
        }
      })
      .catch(err => res.status(400).json(err))
  }
)

module.exports = router
