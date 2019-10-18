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
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { Grid, Header, Button, Loader, Icon, Message } from 'semantic-ui-react'

// Display ranking info based on given id. User can modify ranking info then save
class EditRanking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      intro: '',
      teamInfo: [],
      loading: false,
      leagueId: '',
      empty: false,
      errors: {}
    }
  }

  // Populate team and ranking info through call to backend
  componentDidMount() {
    setRankingsLoading()
    axios
      .get(`/api/rankings/${this.props.match.params.id}`)
      // If success, take info, sort it, and update state with it
      .then(res => {
        stopRankingsLoading()
        const rankings = res.data.rankings.sort((a, b) => a.rank - b.rank)

        this.setState({
          title: res.data.title,
          intro: res.data.intro,
          teamInfo: rankings,
          leagueId: res.data.leagueId,
          loading: false
        })
      })
      // If error, set loading to false
      .catch(err => {
        stopRankingsLoading()
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

  // Reorder list when teams switch positions in the list
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

  // When ranking is saved, create an array with the current positions in the list
  // Include title with updated list and send to backend
  onSaveClick = async e => {
    e.preventDefault()
    let empty = false
    const updated = this.state.teamInfo.map((team, index) => {
      if (team.description === '') {
        empty = true
      }

      this.setState({ empty: empty })

      return {
        ...team,
        rank: index + 1
      }
    })

    const updatedRanking = {
      title: this.state.title,
      intro: this.state.intro,
      rankings: updated
    }

    // Call edit ranking action with ranking info
    this.props.editRanking(
      updatedRanking,
      this.props.history,
      this.state.leagueId,
      this.props.match.params.id
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
            Edit Ranking
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
          <p style={{ fontSize: '20px' }}>Intro:</p>
          <TextAreaFieldGroup
            name="intro"
            placeholder="Intro"
            label="Intro"
            value={this.state.intro}
            onChange={this.onChange}
            error={errors.intro}
          />
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {teamInfo.map((team, index) => (
                  <Rank
                    key={team._id}
                    team={team}
                    rank={team.rank}
                    owners={team.owners}
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
            onClick={this.onSaveClick}
            size="large"
            style={{ marginTop: '10px' }}
          >
            Save
          </Button>
        </DragDropContext>
      )
    }

    return (
      <div className="edit-ranking">
        <Grid centered container>
          <Grid.Row width={12}>
            <Grid.Column>{rankingContent}</Grid.Column>
          </Grid.Row>
        </Grid>
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
