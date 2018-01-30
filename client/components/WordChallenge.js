import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
/**
 * COMPONENT
 */
export class WordChallenge extends React.Component {
  constructor() {
    super();
    this.state = {
      words: []
    };

    this.challenge = this.challenge.bind(this);
  }

  challenge() {
    //Merriam api
    axios
      .get(
        "https://www.dictionaryapi.com/api/v1/references/collegiate/xml/hypocrite?key=[aa4c94ba-b93e-4f26-ba4a-764254860248]"
      )
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    console.log("THIS STATE: ", this.state);

    return <div>Hello</div>;
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    words
  };
};

const mapStateToProps = ({ challenge }) => ({ challenge })
WordChallenge = connect(mapStateToProps)(WordChallenge)


export default WordChallenge

/*
import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase.js";
import { connect } from "react-redux";
import store, { makeGame } from "../store";
import gameLetter from "../HelperStuff";
import { challenge } from "./WordChallenge";
import axios from "axios";

export class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPlayers: 1,
      currentGame: "",
      pot: gameLetter,
      challenge
    };
    this.assignNumPlayers = this.assignNumPlayers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.totalPlayers = this.totalPlayers.bind(this);
    this.challengeWord = this.challengeWord.bind(this);
  }

  assignNumPlayers(evt) {
    evt.preventDefault();
    this.setState({
      numPlayers: +evt.target.value
    });
  }

  totalPlayers(num) {
    var players = [];
    var start = 1;
    while (start <= num) {
      players.push("player " + start);
      start++;
    }
    return players;
  }

  componentDidMount() {
    this.setState({
      currentGame: this.generateGameId()
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const currentGame = this.state.currentGame;
    const pot = this.state.pot;
    const players = this.totalPlayers(this.state.numPlayers);
    const newPlayerGame = makeGame(currentGame, pot, players);
    store.dispatch(newPlayerGame);
    this.props.history.push(`/game/${this.state.currentGame}`);

    // console.log('currentGAme:', currentGame)
    // console.log('pot:', pot)
    // console.log('newPlayerGAme:', newPlayerGame)
  }

  generateGameId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  challengeWord = event => {
    event.preventDefault();

    const word = document.getElementById('challengeFieldValue').value;
    const merriamUrl = "https://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + word + "?key=aa4c94ba-b93e-4f26-ba4a-764254860248";
    return async function getWord(word) {
      console.log(word);
      await axios
        .get(
          merriamUrl
        )
        .then(res => {

          console.log('   RES    ',res.data);
          return <div>res.data</div>
        });
    }();
  }

  render() {
    // console.log('pot', this.state.pot)
    return (
      <div className="main">
        <h1>Team Name</h1>
        <form className="choose-player">
          <button
            className="btn"
            value="1"
            onClick={evt => this.assignNumPlayers(evt)}
          >
            1 Player
          </button>
          <button
            className="btn"
            value="2"
            onClick={evt => this.assignNumPlayers(evt)}
          >
            2 Players
          </button>
          <button
            className="btn"
            value="3"
            onClick={evt => this.assignNumPlayers(evt)}
          >
            3 Players
          </button>
          <button
            className="btn"
            value="4"
            onClick={evt => this.assignNumPlayers(evt)}
          >
            4 Players
          </button>
        </form>
        <form onSubmit={this.handleSubmit} id="new-game">
          <div>
            <button form="new-game" type="submit" className="start-btn">
              CREATE GAME
            </button>
          </div>
        </form>
        <div>
          <form>
            <input type="text" name="name" placeholder="Enter game id" />
            <button>Join Game</button>
          </form>
        </div>
        <div>
          <Link to="/rules">
            <button>Rules</button>
          </Link>
        </div>
        <div>
          <div>
            <form onSubmit={this.challengeWord}>
              <label> Challenge Word </label>
              <div>
                <input id="challengeFieldValue" placeholder="Enter word" />
              </div>
              <div>
                <button type="submit"> Challenge </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      );
    }
  }

  const mapDispatchToProps = { makeGame, challenge };

  export default connect(null, mapDispatchToProps)(MainMenu);

*/