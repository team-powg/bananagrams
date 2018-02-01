import React, {Component} from 'react';
import { connect } from 'react-redux';

class OtherPlayersBoardView extends Component {
  render(){
    return (
      <div style={{
          height: '25%',
          width: 'auto',
          backgroundColor: '#6D92A0',
          border: '1px solid black',
          margin: '0px 5px 5px 0px'
        }}>
        This box will render other player's boards during gameplay
      </div>
    )
  }
}


export default OtherPlayersBoardView
