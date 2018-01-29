import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ItemTypes } from './DnD/Constants';
import { DragSource } from 'react-dnd';
import { getAllLetters } from '../store/tileLetters'

const tileSource = {
  beginDrag(props) {
    console.log('tilesource', props)
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
    // REVIEW: discipline of deleting log messages
    // console.log('tileletters', this.props.tileLetters)
    // console.log('tileletter', tileLetter)
    return connectDragSource(

      // REVIEW: id="yates"?
      <div id="yates" style={{
        height: '100%',
        opacity: isDragging ? 0.5 : 1,
        fontSize: 30,
        fontWeight: 'bold',
        cursor: 'move',
      }}>
        {
         tileLetter &&
         <img src={`/tiles/${tileLetter}.png`} />
        }
      </div>
    );
  }
}

Tile.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

const mapStateToProps = ({tileLetters}) => ({
tileLetters
})
Tile = DragSource(ItemTypes.TILE, tileSource, collect)(Tile);

Tile = connect(mapStateToProps, {getAllLetters})(Tile)

export default Tile
