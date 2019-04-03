import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { importLeague, clearImportErrors } from '../../actions/leagueActions'
import TextFieldGroup from '../common/TextFieldGroup'
import { Grid, Header, Button, Icon } from 'semantic-ui-react'

// Import a fantasy league from ESPN. User enters their league id and submits form
class Import extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leagueId: '',
      errors: {}
    }
  }

  // Clear errors when component is loaded
  componentDidMount() {
    this.props.clearImportErrors()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // If there are errors importing a league, set state with those errors
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors }
    } else {
      return null
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Submit import form to backend
  onSubmit = e => {
    e.preventDefault()

    // Call import league action
    this.props.importLeague(this.state.leagueId, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="import">
        <Grid centered container>
          <Grid.Row>
            <Grid.Column width={12}>
              <Button
                size="large"
                onClick={this.props.history.goBack}
                style={{ marginTop: '10px' }}
              >
                <Icon name="arrow left" />
                Back
              </Button>
              <Header as="h1" textAlign="center" style={{ marginTop: '10px' }}>
                Import a League
              </Header>
              <p style={{ textAlign: 'center' }}>
                Enter your league's ESPN League ID (Found in url). NOTE: League
                must be public.
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="leagueId"
                  placeholder="League ID"
                  label="League ID"
                  value={this.state.leagueId}
                  onChange={this.onChange}
                  error={errors.leagueId}
                />
                <Button
                  type="submit"
                  size="large"
                  primary
                  style={{ marginTop: '10px' }}
                >
                  Import
                </Button>
              </form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

Import.propTypes = {
  importLeague: PropTypes.func.isRequired,
  clearImportErrors: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  league: state.league,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { importLeague, clearImportErrors }
)(withRouter(Import))
