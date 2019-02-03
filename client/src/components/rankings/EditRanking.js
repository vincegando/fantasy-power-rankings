import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import {
  editRanking,
  setRankingsLoading,
  stopRankingsLoading
} from '../../actions/rankingActions'
import Rank from './Rank'
import TextFieldGroup from '../common/TextFieldGroup'

class EditRanking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      teamInfo: [],
      loading: false,
      leagueId: '',
      errors: {}
    }
  }

  componentDidMount() {
    setRankingsLoading()
    axios
      .get(`/api/rankings/${this.props.match.params.id}`)
      .then(res => {
        stopRankingsLoading()
        const rankings = res.data.rankings.sort((a, b) => a.rank - b.rank)

        this.setState({
          title: res.data.title,
          teamInfo: rankings,
          leagueId: res.data.leagueId,
          loading: false
        })
      })
      .catch(err => {
        stopRankingsLoading()
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

  onSaveClick = async e => {
    e.preventDefault()
    const updated = this.state.teamInfo.map((team, index) => {
      return {
        ...team,
        rank: index + 1
      }
    })

    const updatedRanking = {
      title: this.state.title,
      rankings: updated
    }
    this.props.editRanking(
      updatedRanking,
      this.props.history,
      this.state.leagueId,
      this.props.match.params.id
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
            placeholder="title"
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
                    rank={team.rank}
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
      <div className="edit-ranking">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {rankingContent}
              <input
                type="button"
                className="btn btn-info"
                value="Save"
                onClick={this.onSaveClick}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditRanking.propTypes = {
  getRanking: PropTypes.func.isRequired,
  editRanking: PropTypes.func.isRequired,
  ranking: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ranking: state.ranking,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { editRanking }
)(withRouter(EditRanking))
