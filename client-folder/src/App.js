import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'

import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './components/common/PrivateRoute'

import Navbar from './components/layout/Navbar'
import Home from './components/layout/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import Import from './components/import-league/Import'

import './App.css'

if (localStorage.jwtToken) {
  // Set header auth token
  setAuthToken(localStorage.jwtToken)
  // Decode user info from token
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser())
    // Redirect to login page
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Home} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/import" component={Import} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
