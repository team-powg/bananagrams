import React, {Component} from 'react';
import { connect } from 'react-redux';
import { assignPlayerTilesToFirebasePotThunk, updatePot, giveUserPlayerNumberThunk, changeGameStatusThunk, listenToGameThunk, stopListenToGameThunk, listenToNumberOfPlayers, listenToGame } from '../store'

class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPlayersJoined: 1,
      numPlayersExpecting: 1,
      bool: false
    }
    this.startGameHandler = this.startGameHandler.bind(this)
    this.disperseTiles = this.disperseTiles.bind(this);
  }

  async componentDidMount() {
    //connects to firebase and listens to any changes in game
    await this.props.listenToGame(this.props.match.params.currentGame)
  }

  async componentWillReceiveProps (nextProps) {
    //sets state to know how many players it should be expecting
    if (nextProps.createGame && (this.props.createGame !== nextProps.createGame)) {
      this.props.listenToGameThunk(nextProps.createGame.currentGame)
      this.setState({numPlayersExpecting: Object.keys(nextProps.createGame.players).length})
    }
    // assigns players a player number as they join the waiting room
    if (!this.props.user.playerNumber && nextProps.createGame && (this.props.createGame !== nextProps.createGame)) {
      const userId = nextProps.user.sessionId
      const playersObj = await nextProps.createGame.players
      const findNextUnassignedPlayerKey = await Object.entries(playersObj).find(([key, value]) => {
        if (value.id && value.id === userId) { return key }
      })
      let playerNumber = +(findNextUnassignedPlayerKey[0].slice(-1))
      this.props.giveUserPlayerNumberThunk(playerNumber)
    }
    // keeps track of players joining waiting room
    if (nextProps.createGame) {
      const numPlayersJoined = Object.values(nextProps.createGame.players).filter(player => player.id).length

      if (numPlayersJoined > 1) {
        this.setState({numPlayersJoined})
      }
    }
    // When host starts game, all other players will be pushed to game view
    if (nextProps.checkGameStartStatus === true) {
      this.props.history.push(`/game/${nextProps.createGame.currentGame}`)
    }
  }

  componentWillUnmount() {
    // stops listening for gameStarted bool in firebas
    this.props.stopListenToGameThunk(this.props.createGame.currentGame)
  }

  disperseTiles(evt) {
    var beginningPot = this.props.createGame.pot;
    var playerObj = this.props.createGame.players;
    var count;
    var gameId = this.props.createGame.currentGame;

    for (let player in playerObj) {
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
    // Game started status on Firebase is updated to true for all players
    await this.props.changeGameStatusThunk(gameId, true)
    //Tiles are dispersed among players
    await this.disperseTiles();
    // Pushes all players screens to the game
    this.props.history.push(`/game/${gameId}`)
  }

  render() {
    return (
      <div style={{width: '100vw', height: '100vh', top: '0', left: '0', backgroundImage: 'url("/waitingroom1.jpg")', backgroundSize: 'cover', overflow: 'hidden', position: 'fixed'}}>
        <div style={{
          textAlign: 'center',
          color: 'yellow',
          backgroundColor: 'rgba(0,0,0,0.7)', margin: '1%', padding: '1% 3% 1% 3%'
        }}>
          <div>
            <span><h1 style={{fontSize: '2.5em', margin: '1%'}}>Welcome to the Waiting Room!</h1></span>
            {
              this.props.createGame &&
              <div style={{fontSize: '2em'}}>
              <span>This game's ID number is <strong>{this.props.match.params.currentGame}</strong>. Let your friends know!</span>
              </div>
            }
          </div>
          <div style={{fontSize: '1.5em', color: 'white', margin: '2% 5%'}}>
            {
              this.props.createGame && <span> We are expecting {this.state.numPlayersExpecting} players </span>
            }
            {
              this.props.user &&
                <div><span>You are Player {this.props.user.playerNumber}</span></div>
            }
              <div>
                Currently, there are {this.state.numPlayersJoined} players in the room..
              </div>
          </div>
          <div style={{margin: '2% 5%', color: 'yellow'}}>
            <div><span> When all players have joined, anyone can hit the SPLIT button to start the game! </span></div>
            <div style={{marginTop: '2%'}}>
            <form onSubmit={this.startGameHandler}>
              <button type="submit" disabled={!(this.state.numPlayersExpecting === this.state.numPlayersJoined)} className="start-btn">SPLIT!</button>
            </form>
          </div>
        </div>
        <div style={{color: 'black', margin: '0% 15%'}}>
          <span style={{fontSize: '1em', color: '#DDDD03'}}>Basic Rules</span>
          <ul style={{textAlign: 'left', fontSize: '1em', color: 'white'}}>
            <li>Start off by clicking tile you want and then clicking a spot on the board</li>
            <li>Have a tile you don't want? Select it first then hit the "Dump" button to take it out of your hand.  Remember, you will get three random tiles back! </li>
            <li>Once all of your tiles are on the board, you can hit the "Peel" button.  This gives you a new random tile, but also gives every other player an additional tile. </li>
            <li>If you've used up all of your tiles and there are no more tiles to peel from, then you can hit the submit button! Be wary, other opponents can challenge your words at the end of the game!  Make sure to double check before submitting!</li>
            <li>Last but not least, do all of the previous steps faster than your opponents! Good luck!</li>
          </ul>
        </div>
      </div>
    </div>
    )
  }
}

/********** CONTAINER *********/

const mapState = ({createGame, user, checkGameStartStatus}) => ({createGame, user, checkGameStartStatus})
const mapDispatch = {assignPlayerTilesToFirebasePotThunk, updatePot, giveUserPlayerNumberThunk, changeGameStatusThunk, listenToGameThunk, stopListenToGameThunk, listenToNumberOfPlayers, listenToGame}

export default connect(mapState, mapDispatch)(WaitingRoom)
