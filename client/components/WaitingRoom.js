import React, {Component} from 'react';
import { connect } from 'react-redux';

import { assignPlayerTilesToFirebasePotThunk, updatePot, giveUserPlayerNumberThunk, changeGameStatusThunk, listenToGameThunk, stopListenToGameThunk  } from '../store'

class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: 1,
      bool: false
    }
    this.startGameHandler = this.startGameHandler.bind(this)
    this.disperseTiles = this.disperseTiles.bind(this);
  }


  async componentWillReceiveProps (nextProps) {
    //connects to firebase to listen for gameStarted status
    if (nextProps.createGame && (this.props.createGame !== nextProps.createGame)) {
      this.props.listenToGameThunk(nextProps.createGame.currentGame)
    }
    // connects to firebase and assigns players a player number
    if (!this.props.user.playerNumber && nextProps.createGame && (this.props.createGame !== nextProps.createGame)) {
      const userId = nextProps.user.sessionId
      const playersObj = await nextProps.createGame.players
      const findNextUnassignedPlayerKey = Object.entries(playersObj).find(([key, value]) => {
        if (value.id && value.id === userId) { return key }
      })
      let playerNumber = +(findNextUnassignedPlayerKey[0].slice(-1))
      this.props.giveUserPlayerNumberThunk(playerNumber)
    }
    if (nextProps.checkGameStartStatus === true) {
      this.props.history.push(`/game/${nextProps.createGame.currentGame}`)
    }
  }

  componentWillUnmount() {
    this.props.stopListenToGameThunk(this.props.createGame.currentGame)
  }

  disperseTiles(evt) {
    var beginningPot = this.props.createGame.pot;
    var playerObj = this.props.createGame.players;
    var count;
    var gameId = this.props.createGame.currentGame;

    for (var player in playerObj) {
      let playerPot = beginningPot.splice(0, 21);
      if (!count) {
        count = 1
      } else count++;
      this.props.assignPlayerTilesToFirebasePotThunk(playerPot, gameId, count);
    }
    this.props.updatePot(gameId, beginningPot);
  }

async startGameHandler(evt) {
  evt.preventDefault()
  const gameId = this.props.createGame.currentGame;
  //Tiles are dispersed among players
  await this.disperseTiles();
  // Game started status on Firebase is updated to true for all players
  await this.props.changeGameStatusThunk(gameId, true)
  this.props.history.push(`/game/${gameId}`)
}

// playerLength() {
//   var size = 0;
//   var playersObj = this.props.createGame.players
//   for (var key in playersObj) {
//     if (playersObj.hasOwnProperty(key)) size++;
// }
//  if
// }

  render() {
    // console.log("GAME ID: ", this.props.createGame.currentGame)
    console.log("PROPS: ", this.props)
    // const { players, currentGame } = this.props.createGame
    return (
      <div style={{
        textAlign: 'center'
      }}>
      
        <span><h1 style={{fontSize: '2em'}}>Waiting Room</h1></span>
        {
          this.state.players > 1 ?
          <div>
            There is currently 1 player in the room..
          </div>
          :
          <div>
            There are currently {this.state.players} players in the room..
          </div>
        }
        {
          this.props.createGame &&
          <div style={{fontSize: '1.5em'}}>
           Game Id is {this.props.createGame.currentGame}
          </div>
        }
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

const mapState = ({createGame, user, checkGameStartStatus}) => ({createGame, user, checkGameStartStatus})
const mapDispatch = {assignPlayerTilesToFirebasePotThunk, updatePot, giveUserPlayerNumberThunk, changeGameStatusThunk, listenToGameThunk, stopListenToGameThunk}


export default connect(mapState, mapDispatch)(WaitingRoom)

// Create number of players
// Action dispatcher that will send their session ID to the playersArray through reducer to FB to Redux
// When others playersfill out game code then same action dispatcher adds their session id to the player array
// when playerArray = number of players chosen, then the START button highlights
// The server gets the gameId, does the randomizing for tiles and then its dividing, Once thats complete
// Then we can render the game component
