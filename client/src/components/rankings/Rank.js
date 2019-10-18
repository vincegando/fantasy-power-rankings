import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { Header, Card } from 'semantic-ui-react'

// Display each team as a draggable card for creating and editing rankings
class Rank extends Component {
  ownersToString = () => {
    let result = []
    this.props.owners.forEach(owner => {
      result.push(owner.name)
    })

    return result.join(', ')
  }

  render() {
    return (
      <Draggable draggableId={this.props.team._id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <Card
              fluid
              raised
              style={{ marginTop: '20px', marginBottom: '20px' }}
            >
              <Card.Content>
                <Header as="h4">
                  {this.props.rank}. {this.props.team.teamName} (
                  {this.props.team.record}) - {this.ownersToString()}
                </Header>
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.props.team.description}
                  onChange={this.props.onChange}
                />
              </Card.Content>
            </Card>
          </div>
        )}
      </Draggable>
    )
  }
}

Rank.propTypes = {
  team: PropTypes.object.isRequired,
  rank: PropTypes.string.isRequired,
  owners: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Rank
