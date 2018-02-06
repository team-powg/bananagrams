import React, {Component} from 'react';
import { connect } from 'react-redux';
import { assignPlayerTilesToFirebasePotThunk, updatePot, giveUserPlayerNumberThunk, changeGameStatusThunk, listenToGameThunk, stopListenToGameThunk, listenToNumberOfPlayers  } from '../store'

class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPlayersJoined: 0,
      numPlayersExpecting: 1,
      bool: false
    }
    this.startGameHandler = this.startGameHandler.bind(this)
    this.disperseTiles = this.disperseTiles.bind(this);
  }

  async componentWillReceiveProps (nextProps) {

    //connects to firebase to listen for gameStarted status
    if (nextProps.createGame && (this.props.createGame !== nextProps.createGame)) {
      this.props.listenToGameThunk(nextProps.createGame.currentGame)
      this.setState({numPlayersExpecting: Object.keys(nextProps.createGame.players).length})
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

    const numPlayersJoined = Object.values(nextProps.createGame.players).filter(player => player.id).length + 1
    this.setState({numPlayersJoined})
    // When host starts game, all other players will be pushed to game view
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
      let playerPot = beginningPot.splice(0, 3);
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

  render() {

    return (
      <div style={{
        textAlign: 'center',
        color: '#DDDD03'
      }}>
        <div>
          <span><h1 style={{fontSize: '2em'}}>Welcome to the Waiting Room!</h1></span>
          {
            this.props.createGame &&
            <div style={{fontSize: '1.5em'}}>
            <span>This game's ID number is <strong>{this.props.createGame.currentGame}</strong>. Let your friends know!</span>
            </div>
          }
        </div>
        <div style={{color: 'black', margin: '2% 5%'}}>
          {
            this.props.createGame && <span> We are expecting {this.state.numPlayersExpecting} players </span>
          }
          {
            this.props.user &&
              <div><span>You have been assigned player number {this.props.user.playerNumber}</span></div>
          }
          {
            this.state.numPlayersJoined === 1 ?
            <div>
              Currently, there is 1 player in the room..
            </div>
            :
            <div>
              Currently, there are {this.state.numPlayersJoined} players in the room..
            </div>
          }
        </div>
        {
          this.props.user.playerNumber === 1 ?
        <div style={{margin: '2% 5%', color: 'black'}}>
          <div><span> You are the host! When all players have joined, you may start the game! </span></div>
          <div style={{marginTop: '2%'}}>
          <form onSubmit={this.startGameHandler}>
            <button type="submit" className="start-btn">START GAME</button>
          </form>
          </div>
        </div>
        :
        <div> <span> The game will start when all players have joined! </span> </div>
      }
      <div style={{color: 'black', margin: '2% 5%'}}>
        <span style={{fontSize: '1.5em', color: '#DDDD03'}}>Basic Rules</span>
        <ul style={{textAlign: 'left', fontSize: '1em'}}>
          <li>Start off by clicking tile you want and then clicking a spot on the board</li>
          <li>Have a tile you don't want? Select it first then hit the "Dump" button to take it out of your hand.  Remember, you will get three random tiles back! </li>
          <li>Once all of your tiles are on the board, you can hit the "Peel" button.  This gives you a new random tile, but also gives every other player an additional tile. </li>
          <li>If you've used up all of your tiles and there are no more tiles to peel from, then you can hit the submit button! Be wary, other opponents can challenge your words at the end of the game!  Make sure to double check before submitting!</li>
          <li>Last but not least, do all of the previous steps faster than your opponents! Good luck!</li>
        </ul>
      </div>
    </div>
    )
  }
}

/********** CONTAINER *********/

const mapState = ({createGame, user, checkGameStartStatus}) => ({createGame, user, checkGameStartStatus})
const mapDispatch = {assignPlayerTilesToFirebasePotThunk, updatePot, giveUserPlayerNumberThunk, changeGameStatusThunk, listenToGameThunk, stopListenToGameThunk, listenToNumberOfPlayers}

export default connect(mapState, mapDispatch)(WaitingRoom)

// Create number of players
// Action dispatcher that will send their session ID to the playersArray through reducer to FB to Redux
// When others playersfill out game code then same action dispatcher adds their session id to the player array
// when playerArray = number of players chosen, then the START button highlights
// The server gets the gameId, does the randomizing for tiles and then its dividing, Once thats complete
// Then we can render the game component
