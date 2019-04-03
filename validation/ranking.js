const Validator = require('validator')
const isEmpty = require('./is-empty')

// Check if the submitted ranking form is valid
module.exports = function validateRankingInput(data) {
  let errors = {}

  data.rankings = !isEmpty(data.rankings) ? data.rankings : ''
  data.title = !isEmpty(data.title) ? data.title : ''

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
