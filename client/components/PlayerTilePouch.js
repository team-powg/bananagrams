// Component that holds and displays all of the unused tiles assigned to player
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {selectTile} from '../store/selectedTile';


export class PlayerTilePouch extends Component {
  constructor () {
    super()
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(evt) {
    const tileObj = evt;
    console.log('tileletter', tileObj)
    this.props.selectTile(tileObj);
  }

 render() {
   //all tiles from player pot
   const tileSelection = this.props.playersPouch
   console.log('playersPOUCH', this.props.playersPouch)
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
       tileSelection && tileSelection.map(tile => {
         return (
           <div key={tile.id} >
             <img style={{ width: '40px'}} src={tile.img} onClick={() => this.clickHandler(tile)} />
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
const mapState = ({playersPouch}) => ({playersPouch})

export default connect(mapState, mapDispatch)(PlayerTilePouch)
