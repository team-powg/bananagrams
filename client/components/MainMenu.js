import React from 'react'
import {Link} from 'react-router-dom'


const MainMenu = (props) => {
  return (
    <div className="main">
      <h1>Team Name</h1>
      <div className="choose-player">
        <button className="btn">1 Player</button>
        <button className="btn">2 Players</button>
        <button className="btn">3 Players</button>
        <button className="btn">4 Players</button>
      </div>
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

export default MainMenu
