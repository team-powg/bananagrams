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
    this.props.selectTile(tileObj);
  }

 render() {
   //all tiles from player pot
   return (
     <div style={{
       backgroundColor: '#966F33',
       border: '1px solid black',
       width: '100%',
       height: '60vh',
       margin: '0px 0px 5px 5px'
     }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      { this.props.playersPouch && this.props.playersPouch.map(tile => {
          return (
            <div key={tile.id} >
              <img style={{ height: '1.8rem', margin: '2px'}} src={tile.img} onClick={() => this.clickHandler(tile)} />
            </div>
            )
          })
        }
        </div>
       </div>
     )
    }
  }

/***** CONTAINER ****/

const mapState = ({playersPouch}) => ({playersPouch})
const mapDispatch = ({selectTile})

export default connect(mapState, mapDispatch)(PlayerTilePouch)

