import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPlayers: ''
    }
    this.assignNumPlayers = this.assignNumPlayers.bind(this)
  }

  assignNumPlayers(evt) {
    console.log(evt.target.value)
    this.setState({
      numPlayers: evt.target.value
    })
    console.log("CLICKED: ", this.state.numPlayers)
  }
  render () {
    return (
      <div className="main">
        <h1>Team Name</h1>
        <form className="choose-player">
          <button className="btn" value="1" onClick={() => this.assignNumPlayers()}>1 Player</button>
          <button className="btn" value="2" >2 Players</button>
          <button className="btn" value="3" >3 Players</button>
          <button className="btn" value="4">4 Players</button>
        </form>
        <div>
        <button className="start-btn">CREATE GAME</button>
      </div>
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
          <Link to='/game'>
            <button>Game</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default MainMenu
