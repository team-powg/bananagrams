import React, {Component} from 'react';
import { connect } from 'react-redux';
import { assignPlayerTilesToFirebasePotThunk, updatePot, giveUserPlayerNumberThunk } from '../store'

class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bool: false
    }
    this.startGameHandler = this.startGameHandler.bind(this)
    this.disperseTiles = this.disperseTiles.bind(this);
  }

  async componentWillReceiveProps (nextProps) {
    if (nextProps.createGame && (this.props.createGame !== nextProps.createGame)) {
      const userId = nextProps.user.sessionId
      const playersObj = await nextProps.createGame.players
      const findNextUnassignedPlayerKey = Object.entries(playersObj).find(([key, value]) => {
        if (value.id && value.id === userId) { return key }
      })
      let playerNumber = +(findNextUnassignedPlayerKey[0].slice(-1))
      this.props.giveUserPlayerNumberThunk(playerNumber)
    }
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
  await this.disperseTiles();
  this.props.history.push(`/game/${gameId}`)
}

  render() {
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
const mapDispatch = {assignPlayerTilesToFirebasePotThunk, updatePot, giveUserPlayerNumberThunk}

export default connect(mapState, mapDispatch)(WaitingRoom)

// Create number of players
// Action dispatcher that will send their session ID to the playersArray through reducer to FB to Redux
// When others playersfill out game code then same action dispatcher adds their session id to the player array
// when playerArray = number of players chosen, then the START button highlights
// The server gets the gameId, does the randomizing for tiles and then its dividing, Once thats complete
// Then we can render the game component
