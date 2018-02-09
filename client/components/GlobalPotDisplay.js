import React, {Component} from 'react';
import { connect } from 'react-redux';

class GlobalPotDisplay extends Component {
  render() {
    return (
      <div>
        {
          this.props && this.props.createGame && <div style={{
            border: '2px solid black',
            backgroundImage: `url('/outline.jpg')`,
            backgroundSize: 'cover',
            backgroundPositionX: '85%',
            height: '10%',
            margin: '0px 5px 5px 5px',
            textAlign: 'center',
            fontSize: '1.5em',
            color: 'yellow',
            borderRadius: '50px'
          }}>
          {
            this.props.createGame && this.props.createGame.pot ? `Game Pot: ${this.props.createGame.pot.length}`
            : <span>There are no tiles left in the pot! </span>
          }
          </div>
        }
      </div>
      )
  }
}

/******** Container *******/

const mapState = ({createGame}) => ({createGame})

export default connect(mapState, null)(GlobalPotDisplay)
