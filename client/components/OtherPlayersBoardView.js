import React, {Component} from 'react';
import { connect } from 'react-redux';
import OpponentsBoard from './OpponentsBoard';

class OtherPlayersBoardView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const numberOfPlayers = Object.entries(this.props.createGame.players).filter(([key, value]) => value.id !== this.props.user.sessionId)
    return (
      <div style={{
          height: '90%',
          backgroundColor: '#6D92A0',
          border: '1px solid black',
          margin: '0px 5px 5px 0px'
        }}>
        {
          numberOfPlayers && numberOfPlayers.map((player, i) => {
            return (
              <React.Fragment key={i}>
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
