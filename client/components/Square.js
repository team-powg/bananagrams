// Id, Bool: occupied or not
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeSelectedTile } from "../store/selectedTile";
import { removeTileFromPouch, addTileToPouch, updateTilePositionOnFirebase, listenToTiles } from "../store";
import { selectTile } from '../store/selectedTile'

export class Square extends Component {
  constructor(props) {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.assignCoords = this.assignCoords.bind(this);
    this.removeCoords = this.removeCoords.bind(this);
    // this.hasTile = this.hasTile.bind(this)
  }

  assignCoords(tile) {
    const {x, y} = this.props.position
    tile.x = x;
    tile.y = y;
    return tile;
  }

  removeCoords(tile) {
    tile.x = null;
    tile.y = null;
    return tile;
  }

  // hasTile() {
  //   return this.props.tiles[`${this.props.position.x}-${this.props.position.y}`]
  // }

  clickHandler() {
    // If no existing placed tile and a tile is selected by player
    if (!this.props.tile && this.props.selectedTile) {
      const user = this.props.user.playerNumber;
      const currentTile = this.props.selectedTile;
      const gameId = this.props.createGame.currentGame;
      const player = `Player ${user}`
      const playersPouch = [...this.props.createGame.players[player].playerPot]

      //Gives tile square x and y coords and updates local state
      const updatedTile = this.assignCoords(currentTile);

      //Adds updated tile to player's pouch
      let updatedPouch = playersPouch.map(tile => (updatedTile.id === tile.id) ? updatedTile : tile)

      //sends updated pouch to firebase
      this.props.updateTilePositionOnFirebase(updatedPouch, user, gameId)

      // Removes tile from player's pouch && as a selected tile
      this.props.removeTileFromPouch(this.props.selectedTile.id);
      this.props.removeSelectedTile();

    } else if (this.props.tile) {
      // Selects tile on board and removes coords and replaces fb player pot
      let tile = this.props.tile;
      const user = this.props.user.playerNumber;
      const gameId = this.props.createGame.currentGame;
      const player = `Player ${user}`
      const playersPouch = [...this.props.createGame.players[player].playerPot]
      //Removes tile coords
      const updatedTile = this.removeCoords(tile)
      // Brings tile back to player's pouch and resets local state
      this.props.selectTile(updatedTile);

      //Removes tile coords in local
      let updatedPouch = playersPouch.map(tile => (updatedTile.id === tile.id) ? updatedTile : tile)
      //Removes tile coords in firebase
      this.props.updateTilePositionOnFirebase(updatedPouch, user, gameId)
    } else {
      // if square has no tile and player has not selected a tile
      console.log("weird things are happening");
    }
  }

  render() {
    return (
      <div
        onClick={this.clickHandler}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        { this.props.tile ?
            <img style={{ width: "100%" }} src={this.props.tile.img} />
          : null
        }
      </div>
    );
  }
}

const mapState = ({ selectedTile, createGame, user, setTileReducer }, ownProps) => {
  return {
    tile: setTileReducer[`${ownProps.position.x}-${ownProps.position.y}`],
    selectedTile, user, createGame, setTileReducer
  }
}

const mapDispatch = { removeSelectedTile, removeTileFromPouch, addTileToPouch, updateTilePositionOnFirebase, selectTile, listenToTiles };

export default connect(mapState, mapDispatch)(Square);
