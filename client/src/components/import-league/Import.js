import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { importLeague, clearImportErrors } from '../../actions/leagueActions'
import TextFieldGroup from '../common/TextFieldGroup'

class Import extends Component {
  constructor() {
    super()
    this.state = {
      leagueId: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.clearImportErrors()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors }
    } else {
      return null
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    this.props.importLeague(this.state.leagueId, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="import">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>Enter your league's ESPN League ID (Found in url):</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="leagueId"
                  placeholder="League ID"
                  value={this.state.leagueId}
                  onChange={this.onChange}
                  error={errors.leagueId}
                />
                <input
                  type="submit"
                  value="Import"
                  className="btn btn-info btn-block"
                />
              </form>
            </div>
          </div>
        </div>
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
