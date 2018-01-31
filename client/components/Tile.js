import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ItemTypes } from './DnD/Constants';
import { DragSource } from 'react-dnd';
import { getSelectedTile } from '../store/selectedTile'

const tileSource = {
  beginDrag(props) {
    return {
      letter: props.tileLetter,
      tileImage: `/tiles/${props.tileLetter}.png`
      };
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
    const { connectDragSource, isDragging, tileLetter } = this.props;

    return connectDragSource(

      <div id="yates" style={{
        height: '100%',
        opacity: isDragging ? 0.5 : 1,
        fontSize: 30,
        fontWeight: 'bold',
        cursor: 'move',
      }}>
        {
         tileLetter &&
         <img style={{height: '50px'}}src={`/tiles/${tileLetter}.png`} />
        }
      </div>
    );
  }
}

Tile.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

/*****  CONTAINER ******/

const mapStateToProps = ({selectedTile}) => ({
selectedTile })

Tile = DragSource(ItemTypes.TILE, tileSource, collect)(Tile);

Tile = connect(mapStateToProps, {getSelectedTile})(Tile)

export default Tile
