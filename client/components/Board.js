// Connected to the redux store, owns Squares and Tiles
// Knows all the tiles, their values, and their coordinates
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Tile from './Tile';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './BoardSquare';
import { setTilePosition } from '../store/squareToSquareMove';
import PlayerTilePouch from './PlayerTilePouch';
import firebase from '../firebase.js'


// In some reducer file
// const database = firebase.database()
//
// // dispatch this when you componentDidMount
// const refCache = {}
// const listenForGameThunk = (gameId) => (dispatch) => {
//   const gamePath = `games/${gameId}`
//   const handler = (snapshot) => {
//     dispatch(updateGameDataActionCreator(snapshot.val()))
//   }
//   const gameRef = database.ref(`games/${gameId}`)
//   refCache[gamePath] = { handler, gameRef }
//   gameRef.on('value', handler)
// }
//
// const stopListeningForGame (gameId) => {
//   const gamePath = `games/${gameId}`
//   const { handler, gameRef } = refCache[gamePath]
//   gameRef.off('value', handler)
//   delete refCache[gamePath]
// }
//
// componentsWillMount () {
//   this.props.listenForGameThunk(this.props.gameId)
// }
// componentWillUnmount () {
//   this.props.stopListeningForGame(this.props.gameId)
// }


export class Board extends Component {
  constructor() {
    super()
    this.state = {
      currentGame: '',
      pot: '',
      playerOnePot: ''

    }
    // REVIEW: arrow methods
    //          this is used for `movePiece`
    this.grabTiles = this.grabTiles.bind(this)
  }

  static propTypes = {
    setTilePosition: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.setState({
      currentGame: this.props.match.params.currentGame
    })
    // REVIEW: cleanup on unmount/thunks to put state indo redux
    var gameRef = firebase.database().ref('games');
    gameRef.on('child_added', (snapshot, prevChildKey) => {
      var newGame = snapshot.val();
      return this.setState({
        pot: newGame.pot
      })
    });
  }


  movePiece = (x, y) => {
    this.props.setTilePosition(x, y)
  }

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      {/* indentation */}
      <div key={i}
           style={{
            width: '12.5%',
            height: '12.5%',
            border: '1px solid black' //#f4a941
             }}>
          {/* REVIEW: indentation */}
        <BoardSquare
          movePiece={this.movePiece}
          position={{ x, y }}>
          {/* REVIEW: indentation */}
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y) {
    const { tileX, tileY } = this.props.squareToSquareMove.position;
    console.log(this.props.squareToSquareMove.position, 'position')
    if (x === tileX && y === tileY) {
      return <Tile />;
    }
    // there is an implicit else return undefined here
    //else {
    //  return undefined
    //}
  }

  grabTiles(evt) {
    evt.preventDefault()
    var beginningPot = this.state.pot;
    var playerOnePot = [];
    while (playerOnePot.length < 21) {
      var randomLetter = beginningPot[Math.floor(Math.random() * beginningPot.length)];
      var pos = beginningPot.indexOf(randomLetter);
      playerOnePot.push(randomLetter);
      beginningPot = beginningPot.substring(0, pos) + beginningPot.substring(pos + 1);
    }
    // console.log(beginningPot.length)
    this.setState({
      pot: beginningPot,
      playerOnePot: playerOnePot
    })

    //this.props.updatePotThunkCreator(this.state.currentGame, this.state.pot)

    firebase.database().ref('games').child(this.state.currentGame)
    .update({
      pot: this.state.pot,
    })
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }
    // console.log("POT: ", this.state.pot.length)
    // console.log("Player One POt: ", this.state.playerOnePot.length)

    return (
      <div style={{
        width: '650px',
        height: '650px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
        <div>
          <button className="btn" id="grab-tiles" onClick={(evt) => this.grabTiles(evt)}>Grab Tiles</button>
        </div>
        <div >
          <PlayerTilePouch playerOnePot={this.state.playerOnePot} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ squareToSquareMove }) => ({ squareToSquareMove })
Board = DragDropContext(HTML5Backend)(Board);
Board = connect(mapStateToProps, { setTilePosition })(Board)

export default Board

