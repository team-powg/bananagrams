import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store, { makeGame } from "../store";
import { bounce } from "react-animations";
import Radium, { StyleRoot } from "radium";
import fireworks from "./";
import { challenge } from './WordChallenge';


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
    // function playMusic(){
    //   fireworks.play();
    //   }

    challenge('invincible')
    console.log('&&&&&&&&&&&')
    const styles = {
      bounce: {
        animation: "x 1s",
        animationName: Radium.keyframes(bounce, "bounce"),
        animationIterationCount: "10"
      }
    };
    return (
      <StyleRoot>
        <div id="winner-div">
          <div class="center">
            <div class="select-button" />
          </div>
          <button className="btn" id="challenge-winner">
            Challenge Winner
          </button>
          {/* <audio id="music" loop src="fireworks" autoplay> </audio> */}
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
          <img
            id="victory-image"
            src="http://static1.squarespace.com/static/55806048e4b014e817c47363/t/5596b2ffe4b06cf8b4011515/1487970458150/?format=1500w"
          />
        </div>
      </StyleRoot>
    );
  }
}
