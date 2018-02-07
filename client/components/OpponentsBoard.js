import React, {Component} from 'react';
import { connect } from 'react-redux';
import Square from './Square';


export class OpponentsBoard extends Component {
  constructor(props) {
    super(props)
    this.renderSquare = this.renderSquare.bind(this)
  }

  renderSquare(i, j) {
    const x = i;
    const y = j;
    return (
      <div key={i + "-" + j}
      style={{
        width: '6.66%',
        height: '6.66%',
        border: '1px dotted rgba(0, 0, 0, .2)'
      }}>
        <Square position={{ x, y }} playersBoard={false}/>
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

const mapDispatch = null;


export default connect(mapState, mapDispatch)(OpponentsBoard)
