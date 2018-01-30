// Id, Bool: occupied or not
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeSelectedTile } from "../store/selectedTile";
import { removeTileFromPouch, addTileToPouch } from "../store/playersPouch";

export class Square extends Component {
  constructor(props) {
    super();
    this.state = { tile: {} };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    if (!this.state.tile) {
      this.setState({ tile: this.props.selectedTile });
      this.props.removeTileFromPouch(this.props.selectedTile.id);
      this.props.removeSelectedTile();
    } else {
      this.props.addTileToPouch(this.state.tile);
      this.setState({ tile: {} });
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

const mapState = ({ selectedTile }) => ({ selectedTile });

const mapDispatch = { removeSelectedTile, removeTileFromPouch, addTileToPouch };

export default connect(mapState, mapDispatch)(Square);
