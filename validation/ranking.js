const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRankingInput(data) {
  let errors = {}

  data.rankings = !isEmpty(data.rankings) ? data.rankings : ''

  if (Validator.isEmpty(data.rankings)) {
    errors.rankings = 'Rankings are required.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
