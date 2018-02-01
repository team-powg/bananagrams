import React, {Component} from 'react';
import { connect } from 'react-redux';

class GlobalPotDisplay extends Component {
  render() {
    return (
      <div>
        {
          this.props && this.props.createGame && <div style={{
            border: '1px solid black',
            backgroundColor: '#6D92A0',
            width: 'auto',
            margin: '0px 5px 5px 0px',
            textAlign: 'center'
          }}>
          {
            `Total Tiles Remaining: ${this.props.createGame.pot.length}`
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
