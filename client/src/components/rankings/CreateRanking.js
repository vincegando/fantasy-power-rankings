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
import { Grid, Header, Button, Loader, Icon, Message } from 'semantic-ui-react'

// Display info about teams in league. User can reorder teams, add descriptions, and add a title
class CreateRanking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      teamInfo: [],
      loading: false,
      empty: false,
      errors: {}
    }
  }

  //  Populate team info through call to backend
  componentDidMount() {
    setLeaguesLoading()
    axios
      .get(`/api/leagues/${this.props.match.params.leagueId}`)
      // If success, set loading to false, add info to teams state
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
      // If error, set loading to false
      .catch(err => {
        stopLeaguesLoading()
        this.setState({
          loading: false
        })
      })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // If there are errors submitting the ranking, set state with those errors
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors }
    } else {
      return null
    }
  }

  // reorder list when teams switch positions in the list
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  // When dragging stops, update state to reflect current state
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

  // If there's a change to a description, find the corresponding team and update its state
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

  // When new ranking is submitted, strip team info array of unnecessary info
  // Then add title and league id and send to backend
  onSubmitClick = async e => {
    e.preventDefault()
    let empty = false
    const stripped = this.state.teamInfo.map(
      ({ _id, owners, standing, ...rest }, index) => {
        if (rest.description === '') {
          empty = true
        }

        this.setState({ empty: empty })

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

    // Call create ranking action with ranking info
    this.props.createRanking(
      newRanking,
      this.props.history,
      this.props.match.params.leagueId
    )
  }

  render() {
    const { errors, loading, teamInfo, empty } = this.state

    let rankingContent
    if (loading || teamInfo.length === 0) {
      rankingContent = (
        <Loader style={{ marginTop: '100px' }} size="large" active>
          Loading
        </Loader>
      )
    } else {
      rankingContent = (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Button
            size="large"
            onClick={this.props.history.goBack}
            style={{ marginTop: '10px' }}
          >
            <Icon name="arrow left" />
            Back
          </Button>
          <Header as="h1" textAlign="center" style={{ marginTop: '10px' }}>
            New Ranking
          </Header>
          <p style={{ textAlign: 'center' }}>
            Drag and drop teams to change their ranking. Enter a title and
            description for each team before submitting.
          </p>
          <TextFieldGroup
            name="title"
            placeholder="Title"
            label="Title"
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
          {empty ? (
            <Message
              error
              size="tiny"
              content="Description fields are required."
            />
          ) : null}
          <Button
            primary
            onClick={this.onSubmitClick}
            size="large"
            style={{ marginTop: '10px' }}
          >
            Create
          </Button>
        </DragDropContext>
      )
    }

    return (
      <div className="create-ranking">
        <Grid centered container>
          <Grid.Row>
            <Grid.Column width={12}>{rankingContent}</Grid.Column>
          </Grid.Row>
        </Grid>
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
