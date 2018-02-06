import React, {Component} from 'react';
import { connect } from 'react-redux';

export const OpponentsBoard = (props) => {

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



  const mapState = ({user}) => ({user})

  const mapDispatch = { makeGame, updatePot, findGame, getSessionIdThunk, giveUserPlayerNumberThunk}

  export default connect(mapState, mapDispatch)(OpponentsBoard)



