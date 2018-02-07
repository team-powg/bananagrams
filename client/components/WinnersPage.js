import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store, { makeGame } from "../store";
import { bounce } from "react-animations";
import Radium, { StyleRoot } from "radium";
import fireworks from "./";
import { challenge } from './WordChallenge';
import {submitWordsForChallengeThunk} from '../store'

export class WinnersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChallenge = this.handleChallenge.bind(this)
  }


  async handleChallenge (evt) {
    evt.preventDefault();
    const wordArray = await this.props.challengeGame
  }

  render() {
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

          <button className="btn" id="challenge-winner" onClick={(evt) => this.handleChallenge(evt)}>

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

const mapState = ({ challengeGame }) => ({ challengeGame })

const mapDispatchToProps = null

export default connect(mapState, mapDispatchToProps)(WinnersPage)
