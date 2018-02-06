import React, {Component} from 'react';
import { connect } from 'react-redux';

class SelectedTileDisplay extends Component {
  render() {
    return (
      <div style={{
        border: '1px solid black',
        backgroundColor: '#6D92A0',
        width: '100%',
        height: '15%',
        margin: '0px 0px 5px 5px',
        textAlign: 'center'
      }}>
      <span>Your selected tile</span>
      {
        this.props && this.props.selectedTile ?
        <div>
          <img style={{height: '2rem', margin: '2px'}} src={this.props.selectedTile.img} />
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
