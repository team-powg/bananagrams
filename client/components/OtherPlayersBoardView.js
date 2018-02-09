import React, {Component} from 'react';
import { connect } from 'react-redux';
import OpponentsBoard from './OpponentsBoard';

class OtherPlayersBoardView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const numberOfPlayers = Object.entries(this.props.createGame.players).filter(([key, value]) => { if (value.id !== this.props.user.sessionId) {
        return key
      }
    })
    return (
      <div style={{
          height: '92%',
          backgroundImage: `url('/side.jpg')`,
          backgroundSize: 'cover',
          backgroundPositionX: '85%',
          border: '2px solid black',
          margin: '0px 5px 5px 5px',
          borderRadius: '10px'
        }}>
        {
          numberOfPlayers && numberOfPlayers.map((player, i) => {
            return (
              <React.Fragment key={i}>
                <div style={{textAlign: 'center', margin: '-1%'}}><b>{player[0]}</b></div>
                <OpponentsBoard player={numberOfPlayers[i]} gameId={this.props.gameId} />
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }
}

/************ CONTAINER ***********/

const mapState = ({createGame, user}) => ({createGame, user})

const mapDispatch = null

export default connect(mapState, null)(OtherPlayersBoardView)


// <div style={{textAlign: 'center'}}><b>{player[0]}</b></div>
