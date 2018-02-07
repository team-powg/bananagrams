// Connected to the redux store, owns Squares and Tiles
// Knows all the tiles, their values, and their coordinates

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Tile from "./Tile";
// import { DragDropContext } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";
import { setTilePosition } from "../store/squareToSquareMove";
import { getAllPlayerTiles } from "../store/playersPouch";
import PlayerTilePouch from "./PlayerTilePouch";
import GlobalPotDisplay from "./GlobalPotDisplay";
import OtherPlayersBoardView from "./OtherPlayersBoardView";
import SelectedTileDisplay from "./SelectedTileDisplay";
import Square from "./Square";
import GameHeader from "./GameHeader";
import WinnersPage from "./WinnersPage";
import store, {
  updatePot,
  addTileToPouch,
  peelTile,
  dumpTile,
  removeTileFromPouch,
  removeSelectedTile,
  getPlayerTilesThunk,
  globalPotListenerThunk,
  submitWordsForChallengeThunk,
  updatePlayerPotThunk,
  playerPotListenerThunk,
  listenToGame,
  listenToTiles
} from "../store";

export class Board extends Component {
  constructor() {
    super();
    this.dumpTiles = this.dumpTiles.bind(this);
    this.peel = this.peel.bind(this);
    this.handleSubmitGame = this.handleSubmitGame.bind(this);
    this.renderWinPage = this.renderWinPage.bind(this);
  }

  async componentDidMount() {
    if (this.props.createGame) {
      const playerNumber = this.props.user.playerNumber;
      let gameId = this.props.match.params.currentGame;
      let listenToCurrentGame = this.props.listenToGame(gameId);
      const listenTile = this.props.listenToTiles(gameId, playerNumber)
      await listenToCurrentGame;
      await listenTile
    }
  }

  handleSubmitGame(evt) {
    evt.preventDefault();
    const gameId = this.props.createGame.currentGame;
    const playerNumber = this.props.user.playerNumber;
    console.log("***************");
    this.renderWinPage();
  }

  renderWinPage() {
    const winnerDiv = document.getElementById('winner-div');
    // console.log('winnerdiv', winnerDiv)
    winnerDiv.style.display = 'block';
  }

  renderSquare(i, j) {
    const x = i;
    const y = j;
    return (
      <div
        key={i + "-" + j}
        style={{
          width: "6.66%",
          height: "6.66%",
        }}
      >
        <Square position={{ x, y }} playersBoard={true} />
      </div>
    );
  }

  // movePiece = (x, y) => {
  //   this.props.setTilePosition(x, y);
  // };

  // renderPiece(x, y) {
  //   const { tileX, tileY } = this.props.squareToSquareMove.position;
  //   if (x === tileX && y === tileY) {
  //     return <Tile />;
  //   }
  // }


  async peel(evt) {
    evt.preventDefault();
    var globalPot = this.props.createGame.pot;
    let playersArr = Object.keys(this.props.createGame.players);
    let letterArray = [];
    for (var i = 0; i < playersArr.length; i++) {
      var randomLetter = await globalPot[0];
      letterArray.push(randomLetter);
      // console.log("RANDOM LETTER ARRAY: ", letterArray)
      var pos = await globalPot.indexOf(randomLetter);
      globalPot.splice(pos, 1);
    }

    let gameId = this.props.createGame.currentGame;
    // let playerNumber = this.props.user.playerNumber
    // let playerPouch = this.props.playersPouch
    // let updatedPlayerPouch = updatePlayerPotThunk(gameId, playerNumber, playerPouch)
    let getPeeledPot = peelTile(gameId, globalPot, playersArr, letterArray);
    store.dispatch(getPeeledPot);
    // store.dispatch(updatedPlayerPouch)
  }

  async dumpTiles(evt) {
    evt.preventDefault();
    let player = 'Player ' + this.props.user.playerNumber
    let selectedTile = this.props.selectedTile;
    let playerPot = this.props.createGame.players[player].playerPot
    let index = playerPot.indexOf(selectedTile)
    playerPot.splice(index, 1)
    let globalPot = this.props.createGame.pot;
    globalPot.push(selectedTile);
    this.props.removeSelectedTile();
    let count = 0;
    while (count < 3) {
      let randomLetter = await globalPot[0]
      let pos = await globalPot.indexOf(randomLetter);
      playerPot.push(randomLetter)
      globalPot.splice(pos, 1);
      count++;
    }
    let gameId = this.props.createGame.currentGame;
    let swapTile = dumpTile(gameId, globalPot, player, playerPot);
    store.dispatch(swapTile);
  }

  render() {
    const squares = [];
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        squares.push(this.renderSquare(i, j));
      }
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh"
        }}
      >
        <WinnersPage style={{
          display: 'none'
          }
          }/>
        <GameHeader gameId={this.props.createGame.currentGame} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "95vh"
          }}
        >
          <div style={{ width: "25vw", height: "100%" }}>
            <GlobalPotDisplay />
            <OtherPlayersBoardView gameId={this.props.createGame.currentGame} />
          </div>
          <div
            style={{
              backgroundImage: `url('/hardwoodbg.jpg')`,
              width: "50vw",
              height: "100%",
              margin: "0 auto",
              flexDirection: 'column',
              border: "1px solid black",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {squares}
          </div>
          <div style={{ width: "25vw", height: "100%" }}>
            <PlayerTilePouch />
            <SelectedTileDisplay />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "0px 0px 0px 5px"
              }}
            >
              {/* <button className="btn" id="grab-tiles" refs="btn" onClick={(evt) => this.grabTiles(evt)} disabled={this.state.disabled === true}>Grab Tiles</button> */}
              <button
                className="btn"
                id="dump-tiles"
                refs="btn"
                onClick={evt => this.dumpTiles(evt)}
                disabled={this.props.selectedTile ? false : true}
              >
                Dump Tile
              </button>

              <button
                className="btn"
                id="grab-tiles"
                refs="btn"
                onClick={evt => this.peel(evt)}
              >
                PEEL
              </button>
              <Link to={`/game/${this.props.createGame.currentGame}/winner`}>
                <button
                  className="btn"
                  id="submit-tiles"
                  refs="btn"
                  disabled={
                    this.props.createGame &&
                    this.props.createGame.pot &&
                    this.props.createGame.pot.length > 0 &&
                    this.props.playersPouch &&
                    this.props.playersPouch.length > 0
                  }
                  onClick={evt => this.handleSubmitGame(evt)}
                >
                  Submit Game
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/******** CONTAINER **********/

const mapDispatchToProps = {
  updatePot,
  setTilePosition,
  getAllPlayerTiles,
  addTileToPouch,
  peelTile,
  removeTileFromPouch,
  removeSelectedTile,
  getPlayerTilesThunk,
  globalPotListenerThunk,
  playerPotListenerThunk,
  listenToGame,
  submitWordsForChallengeThunk,
  listenToTiles
};

const mapStateToProps = ({
  squareToSquareMove,
  createGame,
  selectedTile,
  playersPouch,
  user
}) => ({
  squareToSquareMove,
  createGame,
  selectedTile,
  dumpTile,
  playersPouch,
  user,
  updatePlayerPotThunk
});

// Board = DragDropContext(HTML5Backend)(Board);
// Board = connect(mapStateToProps, mapDispatchToProps)(Board);

export default connect(mapStateToProps, mapDispatchToProps)(Board);
