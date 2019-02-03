import {
  GET_RANKINGS,
  GET_RANKING,
  LOADING_RANKINGS,
  STOP_LOADING_RANKING
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
    case LOADING_RANKINGS:
      return {
        ...state,
        loading: true
      }
    case STOP_LOADING_RANKING:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
