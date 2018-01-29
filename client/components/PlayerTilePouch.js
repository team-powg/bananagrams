// Component that holds and displays all of the unused tiles assigned to player
import React from 'react';
import Tile from './Tile';


const PlayerTilePouch = (props) => {
  const tileSelection = props.playerOnePot
  return (
    <div style={{
      width: '80vw',
      height: '200px',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap'
    }}>
    {
      tileSelection && tileSelection.map((tile, i) => {
        return (
          <div key={i} >
            <Tile tileLetter={tile} />
            </div>
          )
        })
      }
      </div>
    )
  }

  export default PlayerTilePouch
  // <img style={{ width: '40px'}} src={`/tiles/${tile}.png`} />
