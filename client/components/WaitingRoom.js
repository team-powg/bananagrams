import React, {Component} from 'react';
import { connect } from 'react-redux';

class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bool: false
    }
    this.startGameHandler = this.startGameHandler.bind(this)
  }

startGameHandler() {
  const {gameId, players} = this.props.location.state
  this.props.history.push({
    pathname: `/game/${gameId}`,
    state: { players: players, gameId: gameId }
  })
}

  render() {
    const {gameId, players} = this.props.location.state
    return (
      <div style={{
        textAlign: 'center'
      }}>
        <span>Waiting Room</span>
        <div>
          Waiting on {players} amount of players...
        </div>
        <div>
          Game Id is {gameId}
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

export default connect(null, null)(WaitingRoom)


// Create number of players
// Action dispatcher that will send their session ID to the playersArray through reducer to FB to Redux
// When others playersfill out game code then same action dispatcher adds their session id to the player array
// when playerArray = number of players chosen, then the START button highlights
// The server gets the gameId, does the randomizing for tiles and then its dividing, Once thats complete
// Then we can render the game component
