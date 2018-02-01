import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import store, { makeGame, updatePot, findGame } from '../store';
import gameLetter from '../HelperStuff';
import { challenge } from './WordChallenge';

export class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numpPlayers: 1,
      currentGameId: '',
      pot: gameLetter,
      bool: true,
      joinGame: '',
      errors: ''
    }
    this.assignNumPlayers = this.assignNumPlayers.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.totalPlayers = this.totalPlayers.bind(this)
    this.generateGameId = this.generateGameId.bind(this)
    this.joinGameSubmit = this.joinGameSubmit.bind(this)
    this.joinGameChange = this.joinGameChange.bind(this)
  }

  assignNumPlayers(evt) {
    evt.preventDefault()
    this.setState({
      numPlayers: +evt.target.value,
      bool: false
    })
  }

  totalPlayers(num) {
    var players = {}
    var start = 1
    while (start <= num) {
      players["Player " + start ] = "Player " + start
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


  joinGameChange(evt) {
    const gameId = evt.target.value
    this.setState({joinGame: gameId})
  }

  joinGameSubmit() {
    if (this.state.joinGame) {
      this.props.findGame(this.state.joinGame)
      this.props.history.push(`/waitingroom/${this.state.joinGame}`)
    } else {
      this.setState({errors: 'Please enter a game id'})
    }
  }

 async handleSubmit(evt) {
    evt.preventDefault()
    await this.generateGameId()
    const currentGame = this.state.currentGameId
    const pot = this.state.pot
    const players = this.totalPlayers(this.state.numPlayers)
    // for(var i in players) {

    // }
    const newPlayerGame = makeGame(currentGame, pot, players)
    store.dispatch(newPlayerGame)
    this.props.history.push(`/waitingroom/${this.state.currentGameId}`)
  }

  render() {
    console.log("PROPS FIND GAME: ", this.props.findGame)
    let x = challenge('probably');
    return (
      <div className="main" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{fontSize: '2em'}}>
          <h1>Bananagrams</h1>
        </div>
        <div style={{fontSize: '2em'}}>
          <span>Start A New Game</span>
        </div>
        <div style={{fontSize: '1em', textAlign: 'center'}}>
          <br />
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
        </div>
        <div style={{fontSize: '2em', textAlign: 'center'}}>
          <span>Join A Game</span>
          <form onSubmit={this.joinGameSubmit}>
            <input type="text" name="game" placeholder="Enter game id" onChange={this.joinGameChange} />
            <button type="submit">Join Game</button>
            {
              this.state.errors ? <div style={{fontSize: '15px', color: 'red'}}><span>{this.state.errors}</span></div> : <div></div>
            }
          </form>
        </div>
        <div style={{fontSize: '2em', textAlign: 'center'}}>
          <br />
          <span>Learn The Rules</span>
          <Link to='/rules'>
            <button>Rules</button>
          </Link>
        </div>
        <br />
        <div style={{fontSize: '2em', textAlign: 'center'}}>
          <span>Check Out Your Stats</span>
          <Link to=''>
            <button>Stats</button>
          </Link>
        </div>
      </div>
      )
    }
  }


/********* CONTAINER *********/


const mapDispatchToProps = { makeGame, updatePot, findGame }

export default connect(null, mapDispatchToProps)(MainMenu)
