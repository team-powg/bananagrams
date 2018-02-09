// Component that holds and displays all of the unused tiles assigned to player
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { selectTile, getSessionIdThunk } from '../store';


export class PlayerTilePouch extends Component {
  constructor() {
    super()
    this.clickHandler = this.clickHandler.bind(this)
  }



  clickHandler(evt) {
    const tileObj = evt;
    this.props.selectTile(tileObj);
  }

  render() {

    const player = `Player ${this.props.user.playerNumber}`
    return (
      <div style={{
        backgroundImage: `url('/side.jpg')`,
        backgroundSize: 'cover',
        backgroundPositionX: '85%',
        border: '2px solid black',
        width: '96%',
        padding: '2%',
        height: '69vh',
        margin: '0px 0px 5px 5px',
        borderRadius: '10px'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          {this.props.createGame && player && this.props.user && this.props.user.sessionId && this.props.createGame.players[player].playerPot && this.props.createGame.players[player].playerPot.filter(tile => (!tile.x)).map(tile => {
            return (
              <div key={tile.id} onClick={() => this.clickHandler(tile)}>
                <img style={{ height: '1.8rem', margin: '2px', border: '1px solid black', boxShadow: '1px 1px 5px black' }} src={tile.img} />
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}

/***** CONTAINER ****/

const mapState = ({ playersPouch, createGame, user }) => ({ playersPouch, createGame, user })
const mapDispatch = ({ selectTile, getSessionIdThunk })

export default connect(mapState, mapDispatch)(PlayerTilePouch)

