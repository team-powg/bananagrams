// Connected to the redux store, owns Squares and Tiles
// Knows all the tiles, their values, and their coordinates
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Tile from "./Tile";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import BoardSquare from "./BoardSquare";
import { setTilePosition } from "../store/squareToSquareMove";
import { getAllPlayerTiles } from "../store/playersPouch";
import PlayerTilePouch from "./PlayerTilePouch";
import GlobalPotDisplay from "./GlobalPotDisplay";
import OtherPlayersBoardView from "./OtherPlayersBoardView";
import SelectedTileDisplay from "./SelectedTileDisplay";
import GameHeader from "./GameHeader";
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
  updatePlayerPotThunk
} from "../store";

export class Board extends Component {
  constructor() {
    super();
    this.state = {
      gameId: "",
      disabled: false
    };

    this.dumpTiles = this.dumpTiles.bind(this);
    this.peel = this.peel.bind(this);
    this.handleSubmitGame = this.handleSubmitGame.bind(this);
  }

  async componentDidMount() {
    // this.props.globalPotListenerThunk(this.state.gameId)
    if (this.props.createGame) {
      const playerNumber = this.props.user.playerNumber;
      const gameId = this.props.createGame.currentGame;
      this.props.getPlayerTilesThunk(gameId, playerNumber);
      this.setState({ gameId });
      // console.log("GAME ID: ", gameId)
      const globalPot = this.props.globalPotListenerThunk(gameId);
      await globalPot;
    }
  }

  movePiece = (x, y) => {
    this.props.setTilePosition(x, y);
  };

  renderSquare(i) {
    const x = i % 10;
    const y = Math.floor(i / 10);
    return (
      <div
        key={i}
        style={{
          width: "50px",
          height: "50px",
          border: "1px dotted rgba(0, 0, 0, .2)"
        }}
      >
        <BoardSquare position={{ x, y }} />
      </div>
    );
  }

  handleSubmitGame(evt) {
    evt.preventDefault();
    const gameId = this.props.createGame.currentGame;
    const playerNumber = this.props.user.playerNumber;
    this.props.submitWordsForChallengeThunk(gameId, playerNumber);
  }

  movePiece = (x, y) => {
    this.props.setTilePosition(x, y);
  };

  renderPiece(x, y) {
    const { tileX, tileY } = this.props.squareToSquareMove.position;
    if (x === tileX && y === tileY) {
      return <Tile />;
    }
  }

  async peel(evt) {
    evt.preventDefault();
    var beginningPot = this.props.createGame.pot;
    var randomLetter = await beginningPot[
      Math.floor(Math.random() * beginningPot.length)
    ];
    var pos = await beginningPot.indexOf(randomLetter);
    beginningPot.splice(pos, 1);
    this.props.addTileToPouch(randomLetter);
    let gameId = this.state.gameId;
    let playerNumber = this.props.user.playerNumber;
    let playerPouch = this.props.playersPouch;
    let updatedPlayerPouch = updatePlayerPotThunk(
      gameId,
      playerNumber,
      playerPouch
    );
    let getPeeledPot = peelTile(gameId, beginningPot);
    store.dispatch(getPeeledPot);
    store.dispatch(updatedPlayerPouch);
  }

  async dumpTiles(evt) {
    evt.preventDefault();
    var selectedTile = this.props.selectedTile;
    var currentPot = this.props.createGame.pot;
    currentPot.push(selectedTile);
    this.props.removeTileFromPouch(selectedTile.id);
    this.props.removeSelectedTile();
    var count = 0;
    while (count < 3) {
      var randomLetter = await currentPot[
        Math.floor(Math.random() * currentPot.length)
      ];
      var pos = await currentPot.indexOf(randomLetter);
      this.props.addTileToPouch(randomLetter);
      currentPot.splice(pos, 1);
      count++;
    }
    let gameId = this.state.gameId;
    let playerNumber = this.props.user.playerNumber;
    let playerPouch = this.props.playersPouch;
    let updatedPlayerPouch = updatePlayerPotThunk(
      gameId,
      playerNumber,
      playerPouch
    );
    let swapTile = dumpTile(gameId, currentPot, playerNumber);
    store.dispatch(updatedPlayerPouch);
    store.dispatch(swapTile);
  }

  render() {
    const squares = [];
    for (let i = 0; i < 100; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <GameHeader gameId={this.state.gameId} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "space-between"
          }}
        >
          <div>
            <GlobalPotDisplay />
            <OtherPlayersBoardView />
          </div>
          <div
            style={{
              backgroundImage: `url(${`https://i.pinimg.com/originals/96/57/ba/9657ba4fb7abde9935786a66ccc894ba.jpg`})`,
              width: "620px",
              height: "500px",
              margin: "0 auto",
              border: "1px solid black",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {squares}
          </div>
          <div>
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
                disabled={this.props.playersPouch.length > 0}
              >
                PEEL
              </button>
              <Link to={`/game/${this.state.gameId}/winner`}>
                <button
                  className="btn"
                  id="submit-tiles"
                  refs="btn"
                  disabled={
                    this.props.createGame.pot.length > 0 &&
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
        <GameFooter />
      </div>
    );
  }
}

/******** CONTAINER **********/

const mapDispatchToProps = {
  updatePot,
  submitWordsForChallengeThunk,
  setTilePosition,
  getAllPlayerTiles,
  addTileToPouch,
  peelTile,
  removeTileFromPouch,
  removeSelectedTile,
  getPlayerTilesThunk,
  globalPotListenerThunk
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

Board = DragDropContext(HTML5Backend)(Board);
Board = connect(mapStateToProps, mapDispatchToProps)(Board);

export default Board;
