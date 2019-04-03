import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = {}

// Set redux state when errors occur
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload
    case CLEAR_ERRORS:
      return {}
    default:
      return state
  }
}
