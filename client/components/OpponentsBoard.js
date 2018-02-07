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
    console.log('playerinmount', playerNumber)
    const gameId = await this.props.gameId
    if (playerNumber === 1) {
      this.props.listenTo1TilesThunk(gameId)
    } else if (playerNumber === 2) {
      console.log('hi from opps board')
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
        border: '1px dotted rgba(0, 0, 0, .2)'
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
      <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', height: '33%', width: '100%', border: '1px solid black', margin: '1% 0'}}>
        {squares}
     </div>
    )
  }
}


/********** CONTAINER *********/

const mapState = ({otherPlayersBoards, createGame}) => ({otherPlayersBoards, createGame})

const mapDispatch = {listenTo1TilesThunk, listenTo2TilesThunk, listenTo3TilesThunk, listenTo4TilesThunk}


export default connect(mapState, mapDispatch)(OpponentsBoard)
