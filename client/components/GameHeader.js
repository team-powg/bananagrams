import React from 'react';

const GameHeader = (props) => {
const {gameId} = props
  return (
    <div style={{
      height: '5vh',
      width: '100vw',
      backgroundColor: '#022735',
      color: '#68979B',
      textAlign: 'center',
      margin: '0px 0px 5px 0px'
    }}>
      <div>
        {`Game ID: ${gameId}`}
      </div>
    </div>
  )
}

export default GameHeader
