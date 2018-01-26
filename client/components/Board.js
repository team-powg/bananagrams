// Connected to the redux store, owns Squares and Tiles
// Knows all the tiles, their values, and their coordinates
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Tile from './Tile';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './BoardSquare';
import {setTilePosition} from '../store/tilepositionreducer';
import firebase from '../firebase.js'


export class Board extends Component {
  constructor() {
    super()
    this.state = {
      currentGame: ''
    }


  }
  static propTypes = {
    setTilePosition: PropTypes.func.isRequired
  };

componentDidMount() {
  var gameRef = firebase.database().ref('games');
gameRef.on('value', function(snapshot) {
    snapshot.forEach((childSnapshot) => {
      var childData = childSnapshot.val();
      console.log("STATE: ", childData)
    });
});
  // const gameRef = firebase.database().ref('games')
  // gameRef.on('value', snapshot => {
  //   console.log(value)
  // })

  // gameRef.on('value', snapshot => {
  //   this.setState({currentGame: snapshot.val()})
  // })
  // console.log("STATE: ", this.state)
}


  movePiece = (x, y) => {
    this.props.setTilePosition(x, y)
  }

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare
          movePiece={this.movePiece}
          position={{x, y}}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y) {
    const {tileX, tileY} = this.props.tilePositionReducer.position;
    if (x === tileX && y === tileY) {
      return <Tile />;
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

const mapStateToProps = ({tilePositionReducer}) => ({tilePositionReducer})
Board = DragDropContext(HTML5Backend)(Board);
Board = connect(mapStateToProps, {setTilePosition})(Board)

export default Board

