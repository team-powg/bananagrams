import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { ItemTypes } from './DnD/Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop (props, monitor) {

    // console.log('props in squaretarget', props)
    const {movePiece, position: {x, y} } = props
    movePiece(x, y)
  }
};

function collect(connect, monitor) {
  return {
    item: monitor.getItem(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class BoardSquare extends Component {

  renderOverlay (color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    )
  }

  render() {
    const { position: {x, y}, connectDropTarget, isOver } = this.props;
    const black = (x + y) % 2 === 1;
    const dropStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    }

    return connectDropTarget(
      <div style={dropStyle}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '90%',
            width: '90%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }
}

BoardSquare.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.TILE, squareTarget, collect)(BoardSquare);
