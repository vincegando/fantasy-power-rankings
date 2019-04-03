import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from './types'

// Register a user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    // If success, redirect to login page
    .then(res => history.push('/login'))
    // If error, return the error
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Login a user
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Retrieve token
      const { token } = res.data
      // Save to localStorage
      localStorage.setItem('jwtToken', token)
      // Set token to auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
      // Redirect to dashboard
      history.push('/dashboard')
    })
    // If error, return the error
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Logout user
export const logoutUser = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // set current user to {}, also sets isAuthenticated to false
  dispatch(setCurrentUser({}))
  // Redirect to Login page
  history.push('/login')
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Clear the errors object
export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
