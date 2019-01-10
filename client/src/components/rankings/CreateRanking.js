import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createRankings } from '../../actions/rankingActions'

class CreateRankings extends Component {
  render() {
    return <div>TODO</div>
  }
}

CreateRankings.propTypes = {
  createRankings: PropTypes.func.isRequired,
  ranking: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ranking: state.ranking,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { createRankings }
)(CreateRankings)
