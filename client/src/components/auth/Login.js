import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser, clearErrors } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import { Grid, Header, Button } from 'semantic-ui-react'

// Login a user
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
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
    // If user is logged in, redirect to dashboard
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push('/dashboard')
    }

    // If there are errors logging in, set state with those errors
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors }
    } else {
      return null
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Submit login form to backend
  onSubmit = e => {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    // Call login action
    this.props.loginUser(userData, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="login">
        <Grid centered container>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h1" textAlign="center" style={{ marginTop: '10px' }}>
                Log In
              </Header>
              <p style={{ textAlign: 'center' }}>Log in to your account</p>
              <form noValidate onSubmit={this.onSubmit}>
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
                <Button
                  type="submit"
                  size="large"
                  primary
                  style={{ marginTop: '10px' }}
                >
                  Log In
                </Button>
              </form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
  { loginUser, clearErrors }
)(withRouter(Login))
