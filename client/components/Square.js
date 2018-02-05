// Id, Bool: occupied or not
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeSelectedTile } from "../store/selectedTile";
import { removeTileFromPouch, addTileToPouch, updateTilePositionOnFirebase } from "../store";
import { selectTile } from '../store/selectedTile'

export class Square extends Component {
  constructor(props) {
    super();
    this.state = { tile: null };
    this.clickHandler = this.clickHandler.bind(this);
    this.assignCoords = this.assignCoords.bind(this);
    this.removeCoords = this.removeCoords.bind(this);
  }

  assignCoords(tile) {
    console.log('square,children', this.props.children)
    tile.x = this.props.children[1][0];
    tile.y = this.props.children[1][1];
    return tile;
  }

  removeCoords(tile) {
    tile.x = null;
    tile.y = null;
    return tile;
  }

  clickHandler() {
    // If no existing placed tile and a tile is selected by player
    if (!this.state.tile && this.props.selectedTile) {
      const user = this.props.user.playerNumber;
      const currentTile = this.props.selectedTile;
      const gameId = this.props.createGame.currentGame;
      const player = `Player ${user}`
      const playersPouch = [...this.props.createGame.players[player].playerPot]

      //Gives tile square x and y coords and updates local state
      const updatedTile = this.assignCoords(currentTile);
      this.setState({ tile: updatedTile });

      //Adds updated tile to player's pouch
      let updatedPouch = playersPouch.map(tile => (updatedTile.id === tile.id) ? updatedTile : tile)

      //sends updated pouch to firebase
      this.props.updateTilePositionOnFirebase(updatedPouch, user, gameId)

      // Removes tile from player's pouch && as a selected tile
      this.props.removeTileFromPouch(this.props.selectedTile.id);
      this.props.removeSelectedTile();

    } else if (this.state.tile) {
      let tile = this.state.tile;
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
      this.props.removeTilePositionOnFirebase(updatedPouch, user, gameId)


      this.setState({ tile: null });
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
        <div>
          {this.state.tile && (
            <img style={{ width: "100%" }} src={this.state.tile.img} />
          )}
        </div>
        {this.props.children}
      </div>
    );
  }
}

const mapState = ({ selectedTile, createGame, user }) => ({ selectedTile, user, createGame });

const mapDispatch = { removeSelectedTile, removeTileFromPouch, addTileToPouch, updateTilePositionOnFirebase, selectTile };

export default connect(mapState, mapDispatch)(Square);
