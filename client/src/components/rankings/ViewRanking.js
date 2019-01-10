import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getRanking } from '../../actions/rankingActions'
import ShowRankingsList from './ShowRankingsList'

class ViewRankings extends Component {
  componentDidMount() {
    this.props.getRanking(this.props.match.params.id)
  }

  render() {
    const { ranking, loading } = this.props.ranking

    let rankingContent
    if (ranking === null || loading || Object.keys(ranking).length === 0) {
      rankingContent = <h3>Loading...</h3>
    } else {
      rankingContent = (
        <div>
          <h2>{ranking.title}</h2>
          <ShowRankingsList rankings={ranking.rankings} />
        </div>
      )
    }

    return (
      <div className="view-ranking">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{rankingContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

ViewRankings.propTypes = {
  getRanking: PropTypes.func.isRequired,
  ranking: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ranking: state.ranking
})

export default connect(
  mapStateToProps,
  { getRanking }
)(ViewRankings)
