import React, {Component} from 'react';
import { connect } from 'react-redux';
import OpponentsBoard from './OpponentsBoard';

class OtherPlayersBoardView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const numberOfPlayers = ['1', '2', '3']
    return (
      <div style={{
          height: '90%',
          width: '100%',
          backgroundColor: '#6D92A0',
          border: '1px solid black',
          margin: '0px 5px 5px 0px'
        }}>
        {
          numberOfPlayers.map((player, i) => {
            return (
              <React.Fragment key={i}>
                <OpponentsBoard player={player} gameId={this.props.gameId} />
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }
}

/************ CONTAINER ***********/

const mapState = null

const mapDispatch = null

export default connect(null, null)(OtherPlayersBoardView)


// this.props.numberOfPlayers.map(player => {
//   return (
//     <div style={///>
//     <board playerNumber={playerNumber} style={height: '15%'}/>
//     <div>
//   )
// })
