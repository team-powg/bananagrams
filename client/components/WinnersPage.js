import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store, { makeGame } from "../store";
import { bounce } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

export default class WinnersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // class Test extends React.Component {
  //   render() {
  //     <StyleRoot>
  //       <div className="test" >
  //       </div>
  //     </StyleRoot>
  //   }
  // }
  // this.props.submitWordsForChallengeThunk(gameId, playerNumber);



  // CREATE ON CLICK HANDLER FOR CHALLENGE BUTTON

  render() {
    const styles = {
      bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounce, 'bounce'),
        animationIterationCount: '5'
      }
    }
    return (
      <StyleRoot>
      <div id="winner-div" >
        <button className="btn" id="challenge-winner">
          Challenge Winner
        </button>
        <div id="bananas" style={styles.bounce}>
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
          <img src="/banangrams-glamour.png" />
        </div>
        <img id="victory-image" src="http://static1.squarespace.com/static/55806048e4b014e817c47363/t/5596b2ffe4b06cf8b4011515/1487970458150/?format=1500w" />

      </div>
      </StyleRoot>
    );
  }
}
