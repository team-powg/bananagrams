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


export class Board extends Component {
  constructor() {
    super()
    this.state = {
      currentGame: '',
      pot: '',
      playerOnePot: [],
      disabled: false
    }
    this.grabTiles = this.grabTiles.bind(this)
    // this.className = this.className.bind(this)
  }

  static propTypes = {
    setTilePosition: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.setState({
      currentGame: this.props.match.params.currentGame
    })
    var gameRef = firebase.database().ref(`games/${this.props.match.params.currentGame}` );
    gameRef.on('value', (snapshot) => {
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
      <div key={i}
      style={{
        width: '12.5%',
        height: '12.5%',
        border: '1px dotted rgba(0, 0, 0, .2)'
      }}>
      <BoardSquare
      movePiece={this.movePiece}
      position={{ x, y }}>
      {this.renderPiece(x, y)}
      </BoardSquare>
      </div>
    );
  }

  movePiece = (x, y) => {
    this.props.setTilePosition(x, y)
  }

  renderPiece(x, y) {
    const { tileX, tileY } = this.props.squareToSquareMove.position;
    if (x === tileX && y === tileY) {
      return <Tile tileLetter={'B'} />;
    }
  }

  async grabTiles(evt) {
    evt.preventDefault()
    var beginningPot = this.state.pot;
    var playerOnePot = [];
    console.log("FIRST beginningPot", beginningPot)
    while (playerOnePot.length < 21) {
      var randomLetter = await beginningPot[Math.floor(Math.random() * beginningPot.length)];
      console.log('randomLetter:', randomLetter)
      var pos = await beginningPot.indexOf(randomLetter);
      console.log('pos:', pos)
      playerOnePot.push(randomLetter);
      console.log("playerOnePot", playerOnePot)
      beginningPot.splice((randomLetter.id - 1), 1);
      console.log('pot length', beginningPot.length)
    }
    this.setState({
      playerOnePot: playerOnePot
    })

    await firebase.database().ref('games').child(this.state.currentGame)
      .update({
        pot: beginningPot,
      })
      console.log(" NEW POT: ", this.state.pot.length)
      console.log(" Player Pot: ", this.state.playerOnePot.length)
     this.setState({
       disabled: true
     })
  }

  render() {
    // console.log("STATE: ", this.state.pot.length)
    // console.log("Player pot: ", this.state.playerOnePot.length)
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        backgroundImage: `url(${`https://i.pinimg.com/originals/96/57/ba/9657ba4fb7abde9935786a66ccc894ba.jpg`})`,
        width: '650px',
        height: '650px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
        <div>
          <button className="btn" id="grab-tiles" refs="btn" onClick={(evt) => this.grabTiles(evt)} disabled={this.state.disabled === true}>Grab Tiles</button>
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

