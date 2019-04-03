import {
  GET_LEAGUES,
  GET_CURRENT_LEAGUE,
  LOADING_LEAGUES,
  STOP_LOADING_LEAGUE
} from '../actions/types'

const initialState = {
  leagues: [],
  league: {},
  loading: false
}

// Set redux state when league actions occur
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEAGUES:
      return {
        ...state,
        leagues: action.payload,
        loading: false
      }
    case GET_CURRENT_LEAGUE:
      return {
        ...state,
        league: action.payload,
        loading: false
      }
    case LOADING_LEAGUES:
      return {
        ...state,
        loading: true
      }
    case STOP_LOADING_LEAGUE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
