// Component that holds and displays all of the unused tiles assigned to player
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Tile from './Tile';
import {selectTile} from '../store/selectedTile';


export class PlayerTilePouch extends Component {
  constructor () {
    super()
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(evt) {
    const tileLetter = evt;
    console.log('tileletter', tileLetter)
    this.props.selectTile(evt);
  }

 render() {
   //all tiles from player pot
   const tileSelection = this.props.playerOnePot
   return (
     <div style={{
       backgroundColor: '#966F33',
       border: '3px solid black',
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
             <img style={{ width: '40px'}} src={`/tiles/${tile}.png`} onClick={() => this.clickHandler(tile)} />
           </div>
           )
         })
       }
       </div>
     )
    }
  }

/***** CONTAINER ****/

const mapDispatch = ({selectTile})

  // <Tile tileLetter={tile} />
export default connect(null, mapDispatch)(PlayerTilePouch)
