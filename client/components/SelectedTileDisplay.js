import React, {Component} from 'react';
import { connect } from 'react-redux';

class SelectedTileDisplay extends Component {
  render() {
    return (
      <div style={{
        border: '2px solid black',
        backgroundImage: `url('/side.jpg')`,
        backgroundSize: 'cover',
        backgroundPositionX: '85%',
        width: '96%',
        height: '15%',
        margin: '0px 0px 5px 5px',
        textAlign: 'center',
        borderRadius: '10px'
      }}>
      <span><b>Your selected tile</b></span>
      {
        this.props && this.props.selectedTile ?
        <div>
          <img style={{height: '3em', margin: '2px', border: '1px solid black', boxShadow: '1px 1px 5px black'}} src={this.props.selectedTile.img} />
        </div>
        :
        <div></div>
      }
      </div>
    )
  }
}

/******** Container *******/

const mapState = ({selectedTile}) => ({selectedTile})

export default connect(mapState, null)(SelectedTileDisplay)
