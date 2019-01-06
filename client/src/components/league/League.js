import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentLeague } from '../../actions/leagueActions'
import { getRankings } from '../../actions/rankingActions'
import ShowRankings from './ShowRankings'

class League extends Component {
  componentDidMount() {
    this.props.getCurrentLeague(this.props.match.params.leagueId)
    this.props.getRankings(this.props.match.params.leagueId)
  }

  render() {
    const { league } = this.props.league
    const leagueLoading = this.props.league.loading
    const { rankings, loading } = this.props.ranking

    let pageContent

    if (league == null || loading || leagueLoading) {
      pageContent = <h3>Loading...</h3>
    } else {
      pageContent = (
        <div>
          <div>
            <h2>{league.leagueName}</h2>
          </div>
          <ShowRankings rankings={rankings} />
        </div>
      )
    }

    return (
      <div className="league">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{pageContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

League.propTypes = {
  getCurrentLeague: PropTypes.func.isRequired,
  getRankings: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
  ranking: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  league: state.league,
  ranking: state.ranking
})

export default connect(
  mapStateToProps,
  { getCurrentLeague, getRankings }
)(League)
