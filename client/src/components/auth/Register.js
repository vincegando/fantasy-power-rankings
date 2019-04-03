import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser, clearErrors } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import { Grid, Header, Button } from 'semantic-ui-react'

// Register a new user
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }

  // If user is logged in, redirect to dashboard
  componentDidMount() {
    this.props.clearErrors()
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // If there are errors with registering, set state with those errors
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors }
    } else {
      return null
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Submit register form to backend
  onSubmit = e => {
    e.preventDefault()

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    // Call register action
    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="register">
        <Grid centered container>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h1" textAlign="center" style={{ marginTop: '10px' }}>
                Sign Up
              </Header>
              <p style={{ textAlign: 'center' }}>Create an account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="username"
                  placeholder="Username"
                  label="Username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <TextFieldGroup
                  name="email"
                  type="email"
                  placeholder="Email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  placeholder="Password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  name="password2"
                  type="password"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <Button
                  type="submit"
                  size="large"
                  primary
                  style={{ marginTop: '10px' }}
                >
                  Sign Up
                </Button>
              </form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(withRouter(Register))
