import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

class Rank extends Component {
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
            <h4>
              {this.props.team.standing}. {this.props.team.teamName} (
              {this.props.team.record})
            </h4>
            <TextAreaFieldGroup
              placeholder="Description"
              name="description"
              onChange={this.props.onChange}
            />
          </div>
        )}
      </Draggable>
    )
  }
}

Rank.propTypes = {
  team: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Rank
