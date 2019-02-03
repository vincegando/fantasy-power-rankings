import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { createRanking } from '../../actions/rankingActions'
import {
  getCurrentLeague,
  setLeaguesLoading,
  stopLeaguesLoading
} from '../../actions/leagueActions'
import Rank from './Rank'
import TextFieldGroup from '../common/TextFieldGroup'

class CreateRanking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      teamInfo: [],
      loading: false,
      errors: {}
    }
  }

  componentDidMount() {
    setLeaguesLoading()
    axios
      .get(`/api/leagues/${this.props.match.params.leagueId}`)
      .then(res => {
        stopLeaguesLoading()
        const teamInfo = res.data.teams
          .sort((a, b) => a.standing - b.standing)
          .map(team => {
            team.description = ''
            return team
          })

        this.setState({
          teamInfo: teamInfo,
          loading: false
        })
      })
      .catch(err => {
        stopLeaguesLoading()
        this.setState({
          loading: false
        })
      })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors }
    } else {
      return null
    }
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const teamInfo = this.reorder(
      this.state.teamInfo,
      result.source.index,
      result.destination.index
    )

    this.setState({
      teamInfo: teamInfo
    })
  }

  handleDescriptionChange = id => e => {
    const updated = this.state.teamInfo.map(team => {
      if (id === team._id) {
        return { ...team, description: e.target.value }
      } else {
        return team
      }
    })
    this.setState({
      teamInfo: updated
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitClick = async e => {
    e.preventDefault()
    const stripped = this.state.teamInfo.map(
      ({ _id, owners, standing, ...rest }, index) => {
        return {
          ...rest,
          rank: index + 1
        }
      }
    )
    const newRanking = {
      leagueId: this.props.match.params.leagueId,
      title: this.state.title,
      rankings: stripped
    }
    this.props.createRanking(
      newRanking,
      this.props.history,
      this.props.match.params.leagueId
    )
  }

  render() {
    const { errors, loading, teamInfo } = this.state

    let rankingContent
    if (loading || teamInfo.length === 0) {
      rankingContent = <h3>Loading...</h3>
    } else {
      rankingContent = (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <TextFieldGroup
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
          />
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {teamInfo.map((team, index) => (
                  <Rank
                    key={team._id}
                    team={team}
                    rank={team.standing}
                    index={index}
                    onChange={this.handleDescriptionChange(team._id)}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )
    }

    return (
      <div className="create-ranking">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {rankingContent}
              <input
                type="button"
                className="btn btn-info"
                value="Create"
                onClick={this.onSubmitClick}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
CreateRanking.propTypes = {
  createRanking: PropTypes.func.isRequired,
  ranking: PropTypes.object.isRequired,
  league: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ranking: state.ranking,
  league: state.league,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { createRanking, getCurrentLeague }
)(withRouter(CreateRanking))
