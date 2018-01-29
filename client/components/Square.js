// Id, Bool: occupied or not
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeSelectedTile } from "../store";

export class Square extends Component {
  constructor(props) {
    super();
    this.state = { letter: "" };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    console.log("hello", this);
    this.setState({ letter: this.props.selectedTile });
  }

  render() {
    const fill = "#41eef4";
    const stroke = "#41eef4";

    console.log("state", this.state);
    return (
      <div
        onClick={this.clickHandler}
        style={{
          backgroundColor: fill,
          color: stroke,
          width: "100%",
          height: "100%"
        }}
      >
        <div>
          {
            this.state.letter && <img
              style={{ width: "40px" }}
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
