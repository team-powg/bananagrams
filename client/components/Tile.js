import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './DnD/Constants';
import { DragSource } from 'react-dnd';

const tileSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Tile extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div id="yates" style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 40,
        fontWeight: 'bold',
        cursor: 'move',

      }}>
        {/* ♘*/}
        <img src={`/tiles/B.png`} />
      </div>
    );
  }
}

Tile.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.TILE, tileSource, collect)(Tile);
