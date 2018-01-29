import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase.js'
import { connect } from 'react-redux';
import store, { makeGame } from '../store';
import gameLetter from '../HelperStuff'

export class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPlayers: 1,
      currentGame: '',
      pot: gameLetter
    }
    this.assignNumPlayers = this.assignNumPlayers.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.totalPlayers = this.totalPlayers.bind(this)
  }

  assignNumPlayers(evt) {
    evt.preventDefault()
    this.setState({
      numPlayers: +evt.target.value
    })
  }

  totalPlayers(num) {
    var players = []
    var start = 1
    while (start <= num) {
      players.push("player " + start)
      start ++
    }
    return players
  }

  componentDidMount() {
    this.setState({
      currentGame: this.generateGameId()
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const currentGame = this.state.currentGame
    const pot = this.state.pot
    const players = this.totalPlayers(this.state.numPlayers)
    const newPlayerGame = makeGame(currentGame, pot, players)
    store.dispatch(newPlayerGame)
    this.props.history.push(`/game/${this.state.currentGame}`)

    console.log('currentGAme:', currentGame)
    console.log('pot:', pot)
    console.log('newPlayerGAme:', newPlayerGame)
  }

  generateGameId() {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  render() {
    console.log('pot', this.state.pot)
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

const mapDispatchToProps = { makeGame }

export default connect(null, mapDispatchToProps)(MainMenu)
