import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { Menu, Container, Button } from 'semantic-ui-react'

// Navbar at the top of page. Shows for all pages
class Navbar extends Component {
  // Call logout action when logout button is clicked
  onLogoutClick = e => {
    e.preventDefault()
    this.props.logoutUser(this.props.history)
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <Container fluid>
        <Menu.Item as={Link} to="/dashboard">
          Dashboard
        </Menu.Item>
        <Menu.Item position="right">{user.username}</Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/logout" onClick={this.onLogoutClick}>
            Logout
          </Button>
        </Menu.Item>
      </Container>
    )

    const guestLinks = (
      <Container fluid>
        <Menu.Item position="right">
          <Button as={Link} to="/register" primary>
            Sign Up
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/login">
            Login
          </Button>
        </Menu.Item>
      </Container>
    )

    return (
      <Menu attached inverted stackable size="huge">
        <Menu.Item header>
          <Link to="/">Fantasy Rank</Link>
        </Menu.Item>

        {isAuthenticated ? authLinks : guestLinks}
      </Menu>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar))
