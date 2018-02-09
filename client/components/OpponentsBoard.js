import React, {Component} from 'react';
import { connect } from 'react-redux';
import Square from './Square';
import {listenTo1TilesThunk, listenTo2TilesThunk, listenTo3TilesThunk, listenTo4TilesThunk} from '../store'


export class OpponentsBoard extends Component {
  constructor(props) {
    super(props)
    this.renderSquare = this.renderSquare.bind(this)
  }

  async componentWillMount() {
    const playerNumber = await +this.props.player[0].slice(-1)
    const gameId = await this.props.gameId
    if (playerNumber === 1) {
      this.props.listenTo1TilesThunk(gameId)
    } else if (playerNumber === 2) {
      this.props.listenTo2TilesThunk(gameId)
    } else if (playerNumber === 3) {
      this.props.listenTo3TilesThunk(gameId)
    } else if (playerNumber === 4) {
      this.props.listenTo4TilesThunk(gameId)
    }
  }

  renderSquare(i, j) {
    const playerNumber = +this.props.player[0].slice(-1)
    const x = i;
    const y = j;
    return (
      <div key={i + "-" + j}
      style={{
        width: '6.66%',
        height: '6.66%',
      }}>
        <Square position={{ x, y }} playersBoard={false} playerToListenTo={playerNumber} />
      </div>
    );
  }
  render() {
    const squares = [];
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        squares.push(this.renderSquare(i, j))
      }
    }
    return (
      <div style={{display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      height: '33%',
      width: '65%',
      border: '2px solid black',
      backgroundImage: `url('/opp.jpg')`,
      backgroundSize: 'cover',
      margin: '1% 18% 0%',
      borderRadius: '10px',
      textAlign: 'center'
    }}>
        {squares}
     </div>
    )
  }
}


/********** CONTAINER *********/

const mapState = ({otherPlayersBoards, createGame}) => ({otherPlayersBoards, createGame})

const mapDispatch = {listenTo1TilesThunk, listenTo2TilesThunk, listenTo3TilesThunk, listenTo4TilesThunk}


export default connect(mapState, mapDispatch)(OpponentsBoard)
