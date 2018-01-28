import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ItemTypes } from './DnD/Constants';
import { DragSource } from 'react-dnd';
import { getAllLetters } from '../store/tileLetters'

const tileSource = {
  beginDrag(props) {
    return {letter: props.tileLetters };
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
    // console.log('tileletters', this.props.tileLetters)
    return connectDragSource(

      <div id="yates" style={{
        height: '100%',
        opacity: isDragging ? 0.5 : 1,
        fontSize: 30,
        fontWeight: 'bold',
        cursor: 'move',
      }}>


        <img style={{height: '100%', width: '100%'}} src={`/tiles/P.png`} />

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
