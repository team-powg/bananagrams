import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase.js'


export class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPlayers: 1,
      currentGame: '',
      // REVIEW: this data seems important enough to put it somewhere else
      //         a "constant" somewhere
      pot: 'AAAAAAAAAAAAABBBCCCDDDDDDEEEEEEEEEEEEEEEEEEFFFGGGGHHHIIIIIIIIIIIIJJKKLLLLLMMMNNNNNNNNOOOOOOOOOOOPPPQQRRRRRRRRRSSSSSSTTTTTTTTTUUUUUUVVVWWWXXYYYZZ'
    }
    // REVIEW: arrow methods
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
    firebase.database().ref('games').child(this.state.currentGame).set({
      currentGame: this.state.currentGame,
      pot: this.state.pot,
      players: this.totalPlayers(this.state.numPlayers)
    })
    this.props.history.push(`/game/${this.state.currentGame}`)
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



export default MainMenu
