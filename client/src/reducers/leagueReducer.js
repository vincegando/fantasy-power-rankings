import {
  GET_LEAGUES,
  GET_CURRENT_LEAGUE,
  LOADING_LEAGUES
} from '../actions/types'

const initialState = {
  leagues: [],
  league: {},
  loading: false
}

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
    default:
      return state
  }
}
