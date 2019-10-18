import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

// Navbar at the top of page. Shows for all pages
class NavMenu extends Component {
  // Call logout action when logout button is clicked
  onLogoutClick = e => {
    e.preventDefault()
    this.props.logoutUser(this.props.history)
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </NavItem>
        {/* <NavItem>{user.username}</NavItem> */}
        {/* TODO: Reintroduce this at some point? */}
        <NavItem>
          <NavLink href="/logout" onClick={this.onLogoutClick}>
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    )

    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/register">Sign Up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      </Nav>
    )

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Fantasy Rank</NavbarBrand>
          {isAuthenticated ? authLinks : guestLinks}
        </Navbar>
      </div>
    )
  }
}

NavMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(NavMenu))
