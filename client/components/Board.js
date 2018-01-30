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
import { getAllPlayerTiles } from '../store/playersPouch'
import firebase from '../firebase.js'
import store, { updatePot, peelTile, addTileToPouch } from '../store';

export class Board extends Component {
  constructor() {
    super()
    this.state = {
      gameId: '',
      disabled: false
    }
    this.grabTiles = this.grabTiles.bind(this)
    this.peel = this.peel.bind(this)
  }

  static propTypes = {
    setTilePosition: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.setState({
      gameId: this.props.match.params.currentGame,
    })
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
        border: '1px solid black'
      }}>
      <BoardSquare
      movePiece={this.movePiece}
      position={{ x, y }}>
      {this.renderPiece(x, y)}
      {this['coords']=[x, y]}
      {this['bool']=''}
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

  async peel(evt) {
    evt.preventDefault()
    var beginningPot = this.props.createGame.pot;
    var randomLetter = await beginningPot[Math.floor(Math.random() * beginningPot.length)];
    var pos = await beginningPot.indexOf(randomLetter);
    beginningPot.splice(pos, 1)
    this.props.addTileToPouch(randomLetter)
    let getPeeledPot = peelTile(this.state.gameId, beginningPot)
    store.dispatch(getPeeledPot)
    //leave room to assign peeled tiles to opponents
    //Disable peel button ONLY when the players pouch is empty AND when global pot is less than number of players

  }

  async grabTiles(evt) {
    evt.preventDefault()
    var beginningPot = this.props.createGame.pot;
    var playerOnePot = [];
    while (playerOnePot.length < 21) {
      var randomLetter = await beginningPot[Math.floor(Math.random() * beginningPot.length)];
      var pos = await beginningPot.indexOf(randomLetter);
      playerOnePot.push(randomLetter);
      beginningPot.splice(pos, 1)
    }
    this.setState({
      disabled: true
    })
    let generateNewPot = updatePot(this.state.gameId, beginningPot)
    store.dispatch(generateNewPot)
    this.props.getAllPlayerTiles(playerOnePot)
  }

  render() {
    console.log("PROPS: ", this.props.createGame)
    // console.log("STATE POT: ", this.state.pot)
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

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
          <button className="btn" id="grab-tiles" refs="btn" onClick={(evt) => this.grabTiles(evt)} disabled={this.state.disabled === true}>Grab Tiles</button>
          <button className="btn" id="grab-tiles" refs="btn" onClick={(evt) => this.peel(evt)}>PEEL</button>
        </div>
        <div >
          <PlayerTilePouch playerOnePot={this.state.playerOnePot} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { updatePot, peelTile, setTilePosition, getAllPlayerTiles, addTileToPouch }

const mapStateToProps = ({ squareToSquareMove, createGame }) => ({ squareToSquareMove,
createGame })


Board = DragDropContext(HTML5Backend)(Board);
Board = connect(mapStateToProps, mapDispatchToProps)(Board)

export default Board

