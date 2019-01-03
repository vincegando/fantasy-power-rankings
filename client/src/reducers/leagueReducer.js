import { GET_LEAGUES, LOADING_LEAGUES } from '../actions/types'

const initialState = {
  leagues: null,
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_LEAGUES:
      return {
        ...state,
        loading: true
      }
    case GET_LEAGUES:
      return {
        ...state,
        leagues: action.payload,
        loading: false
      }
    default:
      return state
  }
}
