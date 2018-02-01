import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import store, { makeGame } from '../store';
import gameLetter from '../HelperStuff';
import { challenge } from './WordChallenge';

export class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPlayers: 1,
      currentGameId: '',
      pot: gameLetter,
      bool: true
    }
    this.assignNumPlayers = this.assignNumPlayers.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.totalPlayers = this.totalPlayers.bind(this)
    this.generateGameId = this.generateGameId.bind(this)
  }

  assignNumPlayers(evt) {
    evt.preventDefault()
    this.setState({
      numPlayers: +evt.target.value,
      bool: false
    })
  }

  totalPlayers(num) {
    var players = []
    var start = 1
    while (start <= num) {
      players.push("player " + start)
      start++
    }
    return players
  }

  generateGameId() {
    let gameIdStr = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < 5; i++) {
      gameIdStr += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    this.setState({ currentGameId: gameIdStr })
  }

 async handleSubmit(evt) {
    evt.preventDefault()
    await this.generateGameId()
    console.log('current', this.state.currentGameId)
    const currentGame = this.state.currentGameId
    const pot = this.state.pot
    const players = this.totalPlayers(this.state.numPlayers)
    const newPlayerGame = makeGame(currentGame, pot, players)
    store.dispatch(newPlayerGame)
    this.props.history.push({
      pathname: `/waitingroom/${this.state.currentGameId}`,
      state: { players: this.state.numPlayers, gameId: this.state.currentGameId}
    })
  }

  render() {
    let x = challenge('probably');
    return (
      <div className="main">
        <h1>Team Name</h1>
        <form className="choose-player">
          <button className="btn" value="1" onClick={(evt) => this.assignNumPlayers(evt)}>1 Player</button>
          <button className="btn" value="2" onClick={(evt) => this.assignNumPlayers(evt)}>2 Players</button>
          <button className="btn" value="3" onClick={(evt) => this.assignNumPlayers(evt)}>3 Players</button>
          <button className="btn" value="4" onClick={(evt) => this.assignNumPlayers(evt)}>4 Players</button>
        </form>
        <form onSubmit={this.handleSubmit} id="new-game">
          <div>
            <button form="new-game" type="submit" className="start-btn">CREATE GAME</button>
          </div>
        </form>
        <div>
          <form>
            <input type="text" name="name" placeholder="Enter game id" />
            <button>Join Game</button>
          </form>
        </div>
        <div>
          <Link to='/rules'>
            <button>Rules</button>
          </Link>
        </div>
      </div>
      )
    }
  }


/********* CONTAINER *********/


const mapDispatchToProps = { makeGame }

export default connect(null, mapDispatchToProps)(MainMenu)
