import {
  GET_RANKINGS,
  GET_RANKING,
  CREATE_RANKING,
  LOADING_RANKINGS
} from '../actions/types'

const initialState = {
  rankings: [],
  ranking: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RANKINGS:
      return {
        ...state,
        rankings: action.payload,
        loading: false
      }
    case GET_RANKING:
      return {
        ...state,
        ranking: action.payload,
        loading: false
      }
    case CREATE_RANKING:
      return {
        ...state,
        rankings: [...state.rankings, action.payload]
      }
    case LOADING_RANKINGS:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
