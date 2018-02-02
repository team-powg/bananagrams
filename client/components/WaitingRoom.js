import React, {Component} from 'react';
import { connect } from 'react-redux';
import { assignPlayerTilesToFirebasePotThunk } from '../store'

class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bool: false
    }
    this.startGameHandler = this.startGameHandler.bind(this)
    this.disperseTiles = this.disperseTiles.bind(this);
  }

  disperseTiles(evt) {
    var beginningPot = this.props.createGame.pot;
    var playerPot = [];
    var numberOfPlayers = Object.keys(this.props.createGame.players).length
    console.log('numberOfPlayers', numberOfPlayers)
    while (playerPot.length < 21) {
      var randomLetter = beginningPot[Math.floor(Math.random() * beginningPot.length)];
      var pos = beginningPot.indexOf(randomLetter);
      playerPot.push(randomLetter);
      beginningPot.splice(pos, 1)
    }
    // let generateNewPot = updatePot(this.props.createGame.currentGame, beginningPot)
    // store.dispatch(generateNewPot)
    // this.props.getAllPlayerTiles(playerPot)
  }

startGameHandler(evt) {
  evt.preventDefault()
  const playerId = this.props.user;
  const gameId = this.props.createGame.currentGame;
  // const indivPot;
  this.disperseTiles();
  // assignPlayerTilesToFirebasePotThunk() // indivPot, gameId, playerId
  // this.props.history.push(`/game/${this.props.createGame.currentGame}`)
}

  render() {
    // const { players, currentGame } = this.props.createGame
    return (
      <div style={{
        textAlign: 'center'
      }}>
        <span>Waiting Room</span>
        <div>
          Waiting on amount of players...
        </div>
        <div>
          Game Id is
        </div>
        <div>
          <form onSubmit={this.startGameHandler}>
            <button type="submit" disabled={this.state.bool} className="start-btn">START GAME</button>
          </form>
        </div>
      </div>
    )
  }
}


/********** CONTAINER *********/

const mapState = ({createGame, user}) => ({createGame, user})

export default connect(mapState, null)(WaitingRoom)


// createGame.players.filter(player => player.id === user)

// Create number of players
// Action dispatcher that will send their session ID to the playersArray through reducer to FB to Redux
// When others playersfill out game code then same action dispatcher adds their session id to the player array
// when playerArray = number of players chosen, then the START button highlights
// The server gets the gameId, does the randomizing for tiles and then its dividing, Once thats complete
// Then we can render the game component
