const Validator = require('validator')
const isEmpty = require('./is-empty')

// Check if leagueid is a valid input
module.exports = function validateLeagueInput(data) {
  let errors = {}

  data.leagueId = !isEmpty(data.leagueId) ? data.leagueId : ''

  if (!Validator.isNumeric(data.leagueId)) {
    errors.leagueId = 'League ID must be a number.'
  }

  if (Validator.isEmpty(data.leagueId)) {
    errors.leagueId = 'League ID field is required.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
