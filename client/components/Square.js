// Id, Bool: occupied or not
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeSelectedTile } from "../store/selectedTile";

export class Square extends Component {
  constructor(props) {
    super();
    this.state = { img: '' };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({ img: this.props.selectedTile.img });
    this.props.removeSelectedTile()
  }

  render() {
    return (
      <div
        onClick={this.clickHandler}
        style={{
          width: "100%",
          height: "100%"
        }}>
        <div>
          {
            this.state.img && <img
              style={{ width: "100%" }}
              src={this.state.img}
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
