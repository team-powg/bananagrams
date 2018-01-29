// Id, Bool: occupied or not
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeSelectedTile } from "../store/selectedTile";

export class Square extends Component {
  constructor(props) {
    super();
    this.state = { letter: '' };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({ letter: this.props.selectedTile });
    this.props.removeSelectedTile()
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
          {
            this.state.letter && <img
              style={{ width: "100%" }}
              src={`/tiles/${this.state.letter}.png`}
            />
          }
        </div>
        {this.props.children}
      </div>
    );
  }
}

const mapState = ({ selectedTile }) => ({ selectedTile });

const mapDispatch = { removeSelectedTile };

export default connect(mapState, mapDispatch)(Square);
