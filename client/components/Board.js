// Connected to the redux store, owns Squares and Tiles
// Knows all the tiles, their values, and their coordinates
// import Tiles
// import Squares
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import Tile from './Tile';

export default class Board extends Component {
  constructor(){
    super()
    this.renderSquare = this.renderSquare.bind(this)
  }

  static propTypes = {
    tilePosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    const [tileX, tileY] = this.props.tilePosition;
    const piece = (x === tileX && y === tileY) ?
      <Tile /> :
      null;

    return (
      <div key={i}
            style={{ width: '12.5%', height: '12.5%' }}>
        <Square black={black}>
          {piece}
        </Square>
      </div>
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}
