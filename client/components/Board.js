// Connected to the redux store, owns Squares and Tiles
// Knows all the tiles, their values, and their coordinates
// import Tiles
// import Squares
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import Tile from './Tile';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './BoardSquare';

export class Board extends Component {
  constructor() {
    super()
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  static propTypes = {
    tilePosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare x={x}
                     y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y) {
    const [tileX, tileY] = this.props.tilePosition;
    if (x === tileX && y === tileY) {
      return <Tile />;
    }
  }

  // renderSquare(i) {
  //   const x = i % 8;
  //   const y = Math.floor(i / 8);
  //   const black = (x + y) % 2 === 1;

  //   const [tileX, tileY] = this.props.tilePosition;
  //   const piece = (x === tileX && y === tileY) ?
  //     <Tile /> :
  //     null;

  //   return (
  //     <div key={i}
  //       style={{ width: '12.5%', height: '12.5%' }}
  //       onClick={() => this.handleSquareClick(x, y)}>
  //       <Square black={black}>
  //         {piece}
  //       </Square>
  //     </div>
  //   );
  // }

  handleSquareClick(toX, toY) {
    if (canMoveTile(toX, toY)) {
      moveTile(toX, toY);
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(Board);